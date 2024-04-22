import React from "react";
import { cn } from "@/utils/cn";
import {
    BentoGrid as Grid,
    BentoGridItem as GridItem
} from "../ui/bento-grid";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);


const items = [
    {
        title: "The Category Api",
        description: "List Of Category API",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        links: [
            { label: "/api/category ...get all category", url: "https://example.com/dawn-of-innovation" },
            { label: "/api/category?id=${id} ...delete the category", url: "https://example.com/dawn-of-innovation" },
            { label: "/api/category ...post a category", url: "https://example.com/dawn-of-innovation" },
        ],
    },
    {
        title: "The subcategory Api",
        description: "List Of subcategory API",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        links: [
            { label: "/api/subcategory ...get all subcategory", url: "https://example.com/dawn-of-innovation" },
            { label: "/api/subcategory?id=${id} ...delete the subcategory", url: "https://example.com/dawn-of-innovation" },
            { label: "/api/subcategory ...post a subcategory", url: "https://example.com/dawn-of-innovation" },
        ],
    },
    {
        title: "The Payment Api",
        description: "List Of Payment API",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        links: [
            { label: "/api/example ...get all example", url: "https://example.com/dawn-of-innovation" },
        ],
    },
    {
        title: "The Products Api",
        description: "List Of Products API",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        links: [
            { label: "/api/product   ...for products", url: "https://example.com/dawn-of-innovation" },
            { label: "/api/product/1 ...for single page", url: "https://example.com/dawn-of-innovation" },
            { label: "/api/product?page=${Page}&search=${searchQuery}&cat=${Subcategory}} ...for params", url: "https://example.com/dawn-of-innovation  " },
            { label: "/api/product?id=${productIdDelete} ...for delete", url: "https://example.com/dawn-of-innovation" },
        ],
    },
    {
        title: "The Blogs Api",
        description: "List Of Blogs API",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        links: [
            { label: "/api/example ...get all example", url: "https://example.com/dawn-of-innovation" },
        ],
    },
];

export function APIshowCase() {
    return (
        <section className="bg-[#0a040a]">
            <BentoGrid className="max-w-7xl">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        links={item.links}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </section>
    );
}

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    icon,
    links = [],
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    icon?: React.ReactNode;
    links?: { label: string; url: string }[];
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-black border-white/[0.2] border justify-between flex flex-col space-y-4",
                className
            )}
        >
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    {links.length > 0 && (
                        <ul className="mt-2">
                            {links.map((link, index) => (
                                <li key={index} className="text-sm text-neutral-400 hover:text-neutral-200">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
};