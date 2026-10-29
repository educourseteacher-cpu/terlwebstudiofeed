import { toBlob, toPng } from 'html-to-image';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';
import { AspectRatioType, ThemeType } from '../types';

export interface ExportOptions {
  aspectRatio: AspectRatioType;
  theme: ThemeType;
  slideName?: string;
}

// Get slide physical dimensions in inches for PowerPoint matching the aspect ratio
export function getPptxDimensions(aspectRatio: AspectRatioType) {
  switch (aspectRatio) {
    case 'portrait':
      // 4:5 ratio (1080 x 1350 px) -> 8.0 in x 10.0 in
      return { width: 8.0, height: 10.0, name: 'INSTA_4_5' };
    case 'square':
      // 1:1 ratio (1080 x 1080 px) -> 8.5 in x 8.5 in
      return { width: 8.5, height: 8.5, name: 'INSTA_1_1' };
    case 'story':
      // 9:16 ratio (1080 x 1920 px) -> 6.75 in x 12.0 in
      return { width: 6.75, height: 12.0, name: 'INSTA_9_16' };
    default:
      return { width: 8.0, height: 10.0, name: 'INSTA_4_5' };
  }
}

/**
 * Ensures all web fonts, CSS assets, and images are fully decoded
 * before html-to-image captures the DOM canvas.
 */
async function prepareElementForCapture(element: HTMLElement): Promise<void> {
  // 1. Wait for document fonts to finish loading
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (_) {}
  }

  // 2. Ensure all <img> tags inside element are loaded and decoded
  const imgs = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    imgs.map(async (img) => {
      if (img.complete && img.naturalWidth > 0) return;
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        // Fallback safety timeout
        setTimeout(resolve, 800);
      });
    })
  );

  // 3. Brief micro-delay to allow browser reflow and antialiasing buffer
  await new Promise((r) => setTimeout(r, 60));
}

/**
 * Computes optimal pixelRatio so output is exactly 1080px wide
 */
function getTargetPixelRatio(element: HTMLElement, defaultScale: number = 2.25): number {
  const currentWidth = element.clientWidth || 480;
  if (currentWidth > 0) {
    return 1080 / currentWidth;
  }
  return defaultScale;
}

export async function exportElementToPng(element: HTMLElement, scale?: number): Promise<string> {
  await prepareElementForCapture(element);
  const ratio = scale || getTargetPixelRatio(element, 2.25);

  const filterFn = (domNode: HTMLElement) => {
    if (domNode.getAttribute && domNode.getAttribute('data-canvas-ignore') === 'true') {
      return false;
    }
    return true;
  };

  // Warm-up pass: initializes SVG font caches & CSS transforms
  try {
    await toPng(element, { pixelRatio: 1, quality: 0.95, filter: filterFn });
  } catch (_) {}

  // Final high-fidelity rasterization pass
  return await toPng(element, {
    pixelRatio: ratio,
    quality: 1.0,
    cacheBust: true,
    filter: filterFn,
    style: {
      transform: 'none',
    }
  });
}

export async function exportElementToBlob(element: HTMLElement, scale?: number): Promise<Blob> {
  await prepareElementForCapture(element);
  const ratio = scale || getTargetPixelRatio(element, 2.25);

  const filterFn = (domNode: HTMLElement) => {
    if (domNode.getAttribute && domNode.getAttribute('data-canvas-ignore') === 'true') {
      return false;
    }
    return true;
  };

  // Warm-up pass
  try {
    await toBlob(element, { pixelRatio: 1, quality: 0.95, filter: filterFn });
  } catch (_) {}

  const blob = await toBlob(element, {
    pixelRatio: ratio,
    quality: 1.0,
    cacheBust: true,
    filter: filterFn,
    style: {
      transform: 'none',
    }
  });
  if (!blob) throw new Error('Failed to create image blob');
  return blob;
}

export async function downloadPng(element: HTMLElement, filename: string) {
  const dataUrl = await exportElementToPng(element);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function copyImageToClipboard(element: HTMLElement): Promise<boolean> {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API not supported');
  }
  const blob = await exportElementToBlob(element);
  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]);
  return true;
}

export async function downloadCarouselZip(
  renderSlide: (index: number) => Promise<HTMLElement | null>,
  totalSlides: number,
  baseFilename: string
) {
  const zip = new JSZip();

  for (let i = 0; i < totalSlides; i++) {
    const el = await renderSlide(i);
    if (el) {
      const blob = await exportElementToBlob(el);
      const slideNum = String(i + 1).padStart(2, '0');
      zip.file(`${baseFilename}-slide-${slideNum}.png`, blob);
    }
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.download = `${baseFilename}-all-slides.zip`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

// ========================================================
// POWERPOINT (.PPTX) EXPORT IMPLEMENTATIONS
// ========================================================

/**
 * Export a single slide as a .pptx file with the exact matching aspect ratio
 */
export async function downloadPptx(
  element: HTMLElement,
  filename: string,
  aspectRatio: AspectRatioType
) {
  const dataUrl = await exportElementToPng(element);
  const dims = getPptxDimensions(aspectRatio);

  const pptx = new PptxGenJS();
  pptx.defineLayout({
    name: dims.name,
    width: dims.width,
    height: dims.height,
  });
  pptx.layout = dims.name;

  const slide = pptx.addSlide();
  slide.addImage({
    data: dataUrl,
    x: 0,
    y: 0,
    w: dims.width,
    h: dims.height,
  });

  const cleanFilename = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
  await pptx.writeFile({ fileName: cleanFilename });
}

/**
 * Export multi-slide carousel as a single presentation .pptx file with exact aspect ratio
 */
export async function downloadCarouselPptx(
  renderSlide: (index: number) => Promise<HTMLElement | null>,
  totalSlides: number,
  baseFilename: string,
  aspectRatio: AspectRatioType
) {
  const dims = getPptxDimensions(aspectRatio);

  const pptx = new PptxGenJS();
  pptx.defineLayout({
    name: dims.name,
    width: dims.width,
    height: dims.height,
  });
  pptx.layout = dims.name;

  for (let i = 0; i < totalSlides; i++) {
    const el = await renderSlide(i);
    if (el) {
      const dataUrl = await exportElementToPng(el);
      const slide = pptx.addSlide();
      slide.addImage({
        data: dataUrl,
        x: 0,
        y: 0,
        w: dims.width,
        h: dims.height,
      });
    }
  }

  const cleanFilename = baseFilename.endsWith('.pptx') ? baseFilename : `${baseFilename}.pptx`;
  await pptx.writeFile({ fileName: cleanFilename });
}
