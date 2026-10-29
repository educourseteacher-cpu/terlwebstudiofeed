import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ElementKey, ElementPosition } from '../types';
import { Move, RotateCcw } from 'lucide-react';

interface DraggableElementProps {
  elementKey: ElementKey;
  label: string;
  position?: ElementPosition;
  selectedKey?: ElementKey | null;
  isInteractive?: boolean;
  onSelect?: (key: ElementKey) => void;
  onChangePosition?: (key: ElementKey, pos: ElementPosition) => void;
  className?: string;
  children: React.ReactNode;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  elementKey,
  label,
  position = { x: 0, y: 0, scale: 1 },
  selectedKey,
  isInteractive = false,
  onSelect,
  onChangePosition,
  className = '',
  children
}) => {
  const isSelected = isInteractive && selectedKey === elementKey;
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  const x = position?.x ?? 0;
  const y = position?.y ?? 0;
  const scale = position?.scale ?? 1;

  // Handle Drag Start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isInteractive) return;
    e.stopPropagation();
    if (onSelect) onSelect(elementKey);

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: x,
      initY: y
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isInteractive || !e.touches[0]) return;
    e.stopPropagation();
    if (onSelect) onSelect(elementKey);

    setIsDragging(true);
    dragRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      initX: x,
      initY: y
    };
  };

  // Drag Movement Listener
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current || !onChangePosition) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onChangePosition(elementKey, {
        x: Math.round(dragRef.current.initX + dx),
        y: Math.round(dragRef.current.initY + dy),
        scale
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current || !onChangePosition || !e.touches[0]) return;
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      onChangePosition(elementKey, {
        x: Math.round(dragRef.current.initX + dx),
        y: Math.round(dragRef.current.initY + dy),
        scale
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, elementKey, scale, onChangePosition]);

  // Keyboard Nudge listener when selected
  useEffect(() => {
    if (!isSelected || !onChangePosition) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const step = e.shiftKey ? 10 : 2;
      let newX = x;
      let newY = y;

      if (e.key === 'ArrowLeft') {
        newX -= step;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        newX += step;
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        newY -= step;
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        newY += step;
        e.preventDefault();
      } else {
        return;
      }

      onChangePosition(elementKey, { x: newX, y: newY, scale });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelected, elementKey, x, y, scale, onChangePosition]);

  const hasOffset = x !== 0 || y !== 0 || scale !== 1;

  return (
    <div
      onClick={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        if (onSelect) onSelect(elementKey);
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
        transformOrigin: 'center center',
      }}
      className={`relative transition-shadow duration-150 ${className} ${
        isInteractive ? 'cursor-grab active:cursor-grabbing select-none' : ''
      } ${
        isSelected
          ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black/50 z-30 rounded-lg shadow-lg'
          : isInteractive
          ? 'hover:ring-1 hover:ring-amber-400/60 rounded-md'
          : ''
      }`}
    >
      {/* Visual Selection Indicator Badge (Hidden during Export) */}
      {isSelected && (
        <div 
          data-canvas-ignore="true"
          className="absolute -top-7 left-0 z-40 bg-slate-900 border border-amber-400 text-amber-400 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold flex items-center gap-1.5 shadow-xl whitespace-nowrap pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Move className="w-2.5 h-2.5" />
          <span>{label}</span>
          <span className="text-slate-400 text-[8px] bg-black/40 px-1 py-0.2 rounded font-mono">
            {x >= 0 ? `+${x}` : x}px, {y >= 0 ? `+${y}` : y}px
          </span>
          {hasOffset && (
            <button
              type="button"
              title="Reset posisi elemen ini"
              onClick={() => onChangePosition && onChangePosition(elementKey, { x: 0, y: 0, scale: 1 })}
              className="hover:text-white p-0.5"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      )}

      {/* 4 Corner Anchor Dots when selected */}
      {isSelected && (
        <>
          <span data-canvas-ignore="true" className="absolute -top-1 -left-1 w-2 h-2 bg-amber-400 border border-black rounded-full pointer-events-none" />
          <span data-canvas-ignore="true" className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 border border-black rounded-full pointer-events-none" />
          <span data-canvas-ignore="true" className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400 border border-black rounded-full pointer-events-none" />
          <span data-canvas-ignore="true" className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-400 border border-black rounded-full pointer-events-none" />
        </>
      )}

      {children}
    </div>
  );
};
