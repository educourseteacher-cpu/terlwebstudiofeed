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

export async function exportElementToPng(element: HTMLElement, scale: number = 2.5): Promise<string> {
  return await toPng(element, {
    pixelRatio: scale,
    quality: 0.98,
    cacheBust: true,
  });
}

export async function exportElementToBlob(element: HTMLElement, scale: number = 2.5): Promise<Blob> {
  const blob = await toBlob(element, {
    pixelRatio: scale,
    quality: 0.98,
    cacheBust: true,
  });
  if (!blob) throw new Error('Failed to create image blob');
  return blob;
}

export async function downloadPng(element: HTMLElement, filename: string) {
  const dataUrl = await exportElementToPng(element, 2.5);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function copyImageToClipboard(element: HTMLElement): Promise<boolean> {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API not supported');
  }
  const blob = await exportElementToBlob(element, 2.5);
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
      const blob = await exportElementToBlob(el, 2.5);
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
  const dataUrl = await exportElementToPng(element, 2.5);
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
      const dataUrl = await exportElementToPng(el, 2.5);
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
