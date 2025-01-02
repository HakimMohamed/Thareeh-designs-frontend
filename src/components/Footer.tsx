import React from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";

const Footer = () => {
  const techStack = [
    {
      name: "TypeScript",
      path: "/typescript.svg",
    },
    {
      name: "AWS",
      path: "aws.svg",
    },
    {
      name: "Next.js",
      path: "/next.svg",
    },
    {
      name: "Tailwind CSS",
      path: "tailwind.svg",
    },
    {
      name: "Nginx",
      path: "nginx.svg",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/hakimmohamed",
      path: "/github.svg",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/hakim-mohamed-22151b221/",
      path: "/linkedin.svg",
    },
    {
      name: "Dev.to",
      url: "https://dev.to/hakimmohamed",
      path: "/dev-com.svg",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Creator Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Created By</h3>
            <p className="text-gray-400">Hakim Mohamed</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  <Image
                    src={link.path}
                    alt={link.name}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Built With</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  <Image
                    src={tech.path}
                    alt={tech.name}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Hakim Mohamed. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
