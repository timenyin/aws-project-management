import Image from "next/image";

const Footer = () => {
    return (
      <footer className="flex items-center justify-center gap-5 p-4 border-t-2 border-gray-300 dark:border-gray-300">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <Image
            src="https://pm-s3-images-folder.s3.us-east-1.amazonaws.com/Management_Logo.svg"
            alt="Logo"
            width={60}
            height={60}
          />
          <div>
            <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">
              MANAGEMENT
            </h3>
            <p className="text-xs text-gray-500">H A R M O N Y 2K</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

  