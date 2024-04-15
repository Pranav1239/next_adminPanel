"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import Image from "next/image";
import { useState } from "react";

interface ImageData {
    publicId: string;
    width: number;
    height: number;
    secureURL: string;
}

const MediaUploader = () => {
    const [image, setImage] = useState<ImageData | null>(null);

    const onUploadSuccessHandler = (result: any) => {
        setImage({
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url,
        });
        toast.success("Image added successfully");
    };

    const onUploadErrorHandler = (error: any) => {
        toast.error("Failed to upload image");
        console.error(error);
    };

    return (
        <CldUploadWidget
            uploadPreset="top7nqrj"
            options={{ multiple: false, resourceType: "image" }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-gray-800"> Original </h3>
                    {image?.publicId ? (
                        <div className="cursor-pointer overflow-hidden rounded-lg">
                            <CldImage
                                src={image.publicId}
                                alt="image"
                                width={image.width}
                                height={image.height}
                                sizes="(max-width: 767px) 100vw, 50vw"
                                className="media-uploader_cldImage"
                            />
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
                            onClick={() => open()}
                        >
                            <div className="media-uploader_cta-image">
                                <Image
                                    src="/assets/icons/add.svg"
                                    alt="Add Image"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <p className="text-sm text-gray-500">Click here to upload image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
};

export default MediaUploader;