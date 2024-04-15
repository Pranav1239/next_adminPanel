"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface Image {
    url: string;
}

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: Image[]) => void;
    onRemove: (value: string) => void;
    value: Image[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [value]);

    const onSuccess = (result: any) => {
        onChange([...value, { url: result.info.secure_url }]);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((img) => (
                    <div key={img.url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(img.url)} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image fill className="object-cover" alt="Image" src={img.url} />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onSuccess} uploadPreset="top7nqrj">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };
                    return (
                        <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
                            <ImagePlus className="h-4 w-4 mr-2" /> Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;