"use client";

import { useState, useEffect } from "react";
import { Copy, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FloatingImage {
  id: string;
  src: string;
  shape: string;
  size: number;
}

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);
  const [animationStyle, setAnimationStyle] = useState<string>("style1");
  const { toast } = useToast();

  useEffect(() => {
    const savedBackground = localStorage.getItem("backgroundImage");
    const savedImages = localStorage.getItem("floatingImages");
    const savedAnimation = localStorage.getItem("animationStyle");

    if (savedBackground) setBackgroundImage(savedBackground);
    if (savedImages) {
      const images = JSON.parse(savedImages);
      setFloatingImages(images);
      if (images.length > 0) {
        setShowModal(false);
      }
    }
    if (savedAnimation) setAnimationStyle(savedAnimation);
  }, []);

  const handleCopyAndOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await navigator.clipboard.writeText("/syztem-control");
    toast({
      title: "Copied!",
      description: "Secret path copied to clipboard",
    });
    window.open(
      "https://rkmri.co/IeESlNemNT0y/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const getShapeStyle = (shape: string) => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-none";
      case "rounded":
        return "rounded-2xl";
      case "hexagon":
        return "clip-hexagon";
      case "star":
        return "clip-star";
      case "triangle":
        return "clip-triangle";
      default:
        return "rounded-full";
    }
  };

  const getAnimationClass = (index: number) => {
    const animations = {
      style1: ["float-1", "float-2", "float-3", "float-4", "float-5"],
      style2: ["drift-1", "drift-2", "drift-3", "drift-4", "drift-5"],
      style3: ["bounce-1", "bounce-2", "bounce-3", "bounce-4", "bounce-5"],
      style4: [
        "spin-float-1",
        "spin-float-2",
        "spin-float-3",
        "spin-float-4",
        "spin-float-5",
      ],
      style5: ["wave-1", "wave-2", "wave-3", "wave-4", "wave-5"],
    };
    const styleArray =
      animations[animationStyle as keyof typeof animations] ||
      animations.style1;
    return styleArray[index % styleArray.length];
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          50% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
          75% {
            transform: translate(20px, 30px) rotate(3deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-40px, 25px) rotate(-7deg);
          }
          66% {
            transform: translate(35px, -20px) rotate(7deg);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(25px, 40px) rotate(10deg);
          }
        }
        @keyframes float-4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-30px, -25px) rotate(-5deg);
          }
          75% {
            transform: translate(30px, 25px) rotate(5deg);
          }
        }
        @keyframes float-5 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-35px, -35px) rotate(-8deg);
          }
        }

        @keyframes drift-1 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(100vw, 50vh);
          }
        }
        @keyframes drift-2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-80vw, 70vh);
          }
        }
        @keyframes drift-3 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60vw, -40vh);
          }
        }
        @keyframes drift-4 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-90vw, -60vh);
          }
        }
        @keyframes drift-5 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(70vw, 80vh);
          }
        }

        @keyframes bounce-1 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-80px);
          }
        }
        @keyframes bounce-2 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-60px);
          }
        }
        @keyframes bounce-3 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-100px);
          }
        }
        @keyframes bounce-4 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-70px);
          }
        }
        @keyframes bounce-5 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-90px);
          }
        }

        @keyframes spin-float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(40px, -40px) rotate(90deg);
          }
          50% {
            transform: translate(0, 0) rotate(180deg);
          }
          75% {
            transform: translate(-40px, 40px) rotate(270deg);
          }
        }
        @keyframes spin-float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(50px, 50px) rotate(180deg);
          }
        }
        @keyframes spin-float-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-30px, 30px) rotate(120deg);
          }
          66% {
            transform: translate(30px, -30px) rotate(240deg);
          }
        }
        @keyframes spin-float-4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-45px, -45px) rotate(360deg);
          }
        }
        @keyframes spin-float-5 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(35px, 35px) rotate(90deg);
          }
          75% {
            transform: translate(-35px, -35px) rotate(270deg);
          }
        }

        @keyframes wave-1 {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(50px) translateY(-30px);
          }
          50% {
            transform: translateX(0) translateY(-60px);
          }
          75% {
            transform: translateX(-50px) translateY(-30px);
          }
        }
        @keyframes wave-2 {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(60px) translateY(-50px);
          }
        }
        @keyframes wave-3 {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          33% {
            transform: translateX(-40px) translateY(-40px);
          }
          66% {
            transform: translateX(40px) translateY(-40px);
          }
        }
        @keyframes wave-4 {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-70px) translateY(-35px);
          }
        }
        @keyframes wave-5 {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(45px) translateY(-45px);
          }
          75% {
            transform: translateX(-45px) translateY(-45px);
          }
        }

        .float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        .float-2 {
          animation: float-2 10s ease-in-out infinite;
        }
        .float-3 {
          animation: float-3 7s ease-in-out infinite;
        }
        .float-4 {
          animation: float-4 9s ease-in-out infinite;
        }
        .float-5 {
          animation: float-5 11s ease-in-out infinite;
        }

        .drift-1 {
          animation: drift-1 20s linear infinite alternate;
        }
        .drift-2 {
          animation: drift-2 25s linear infinite alternate;
        }
        .drift-3 {
          animation: drift-3 22s linear infinite alternate;
        }
        .drift-4 {
          animation: drift-4 28s linear infinite alternate;
        }
        .drift-5 {
          animation: drift-5 24s linear infinite alternate;
        }

        .bounce-1 {
          animation: bounce-1 3s ease-in-out infinite;
        }
        .bounce-2 {
          animation: bounce-2 3.5s ease-in-out infinite;
        }
        .bounce-3 {
          animation: bounce-3 2.8s ease-in-out infinite;
        }
        .bounce-4 {
          animation: bounce-4 3.2s ease-in-out infinite;
        }
        .bounce-5 {
          animation: bounce-5 2.5s ease-in-out infinite;
        }

        .spin-float-1 {
          animation: spin-float-1 12s linear infinite;
        }
        .spin-float-2 {
          animation: spin-float-2 10s linear infinite;
        }
        .spin-float-3 {
          animation: spin-float-3 14s linear infinite;
        }
        .spin-float-4 {
          animation: spin-float-4 11s linear infinite;
        }
        .spin-float-5 {
          animation: spin-float-5 13s linear infinite;
        }

        .wave-1 {
          animation: wave-1 6s ease-in-out infinite;
        }
        .wave-2 {
          animation: wave-2 7s ease-in-out infinite;
        }
        .wave-3 {
          animation: wave-3 5.5s ease-in-out infinite;
        }
        .wave-4 {
          animation: wave-4 6.5s ease-in-out infinite;
        }
        .wave-5 {
          animation: wave-5 8s ease-in-out infinite;
        }

        .clip-hexagon {
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }
        .clip-star {
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
        }
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>

      <div className="relative w-full h-screen overflow-hidden">
        {backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
        )}

        {floatingImages.map((img, index) => (
          <div
            key={img.id}
            className={`absolute ${getAnimationClass(index)}`}
            style={{
              left: `${(index * 17 + 10) % 80}%`,
              top: `${(index * 23 + 15) % 70}%`,
              width: `${img.size}px`,
              height: `${img.size}px`,
            }}
          >
            <img
              src={img.src}
              alt=""
              className={`w-full h-full object-cover shadow-2xl ${getShapeStyle(img.shape)}`}
              style={{
                filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
              }}
            />
          </div>
        ))}

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Welcome to the Dungeon
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-center text-base pt-4">
                Enter the secret word in the URL to enter the dungeon
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center py-6">
              <div className="text-6xl">🗝️</div>
            </div>
            <DialogFooter className="sm:justify-center">
              <Button
                type="button"
                onClick={handleCopyAndOpen}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Secret Path
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
