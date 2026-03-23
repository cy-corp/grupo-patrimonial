import { ImageIcon } from 'lucide-react';
import { ImageUploadButton } from './ImageUploadButton';

export function SlotCard({ slot, activeImage }: { slot: any, activeImage: any }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgba(217,197,143,0.05)] transition-shadow">
      <div className="aspect-[16/9] w-full bg-surface-container flex items-center justify-center relative border-b border-outline-variant/20 overflow-hidden group">
        {activeImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`${activeImage.url}?v=${new Date().getTime()}`} 
              alt={slot.label} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-on-surface-variant/40">
            <ImageIcon size={48} className="mb-2" />
            <span className="text-sm font-medium">Nenhuma imagem ativa</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline font-bold text-lg text-on-surface">{slot.label}</h3>
            <span className="text-[10px] font-mono bg-surface-container border border-outline-variant/20 px-2 py-0.5 rounded text-primary">
              {slot.slot_key}
            </span>
          </div>
          {slot.description && (
            <p className="text-sm text-on-surface-variant leading-relaxed min-h-[40px]">
              {slot.description}
            </p>
          )}
        </div>

        <ImageUploadButton slotId={slot.id} slotKey={slot.slot_key} />
      </div>
    </div>
  );
}
