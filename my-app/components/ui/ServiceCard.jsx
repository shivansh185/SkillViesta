import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm">
      <Image src={image} alt={title} width={400} height={250} className="w-full h-52 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link href={link} className="text-blue-600 font-medium flex items-center mt-4">
          View Details <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
