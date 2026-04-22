import Image, { type ImageProps } from "next/image";
import { asset } from "@/data/uniconvtor";

type RemoteImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export default function RemoteImage({ src, alt, ...props }: RemoteImageProps) {
  return <Image src={asset(src)} alt={alt} {...props} />;
}
