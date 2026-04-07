"use client";

import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, Trash2, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FloatingImage {
  id: string;
  src: string;
  shape: string;
  size: number;
}

const shapes = [
  { value: "circle", label: "Circle" },
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded Square" },
  { value: "hexagon", label: "Hexagon" },
  { value: "star", label: "Star" },
  { value: "triangle", label: "Triangle" },
];

const sizes = [
  { value: 60, label: "Small" },
  { value: 100, label: "Medium" },
  { value: 150, label: "Large" },
  { value: 200, label: "Extra Large" },
];

export default function SyztemControl() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);
  const [animationStyle, setAnimationStyle] = useState<string>("style1");

  useEffect(() => {
    const savedBackground = localStorage.getItem("backgroundImage");
    const savedImages = localStorage.getItem("floatingImages");
    const savedAnimation = localStorage.getItem("animationStyle");

    if (savedBackground) setBackgroundImage(savedBackground);
    if (savedImages) setFloatingImages(JSON.parse(savedImages));
    if (savedAnimation) setAnimationStyle(savedAnimation);
  }, []);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBackgroundImage(result);
        localStorage.setItem("backgroundImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage: FloatingImage = {
            id: Date.now().toString() + Math.random(),
            src: reader.result as string,
            shape: "circle",
            size: 100,
          };
          const updatedImages = [...floatingImages, newImage];
          setFloatingImages(updatedImages);
          localStorage.setItem("floatingImages", JSON.stringify(updatedImages));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const updateImageShape = (id: string, shape: string) => {
    const updatedImages = floatingImages.map((img) =>
      img.id === id ? { ...img, shape } : img,
    );
    setFloatingImages(updatedImages);
    localStorage.setItem("floatingImages", JSON.stringify(updatedImages));
  };

  const updateImageSize = (id: string, size: number) => {
    const updatedImages = floatingImages.map((img) =>
      img.id === id ? { ...img, size } : img,
    );
    setFloatingImages(updatedImages);
    localStorage.setItem("floatingImages", JSON.stringify(updatedImages));
  };

  const deleteImage = (id: string) => {
    const updatedImages = floatingImages.filter((img) => img.id !== id);
    setFloatingImages(updatedImages);
    localStorage.setItem("floatingImages", JSON.stringify(updatedImages));
  };

  const randomizeAnimation = () => {
    const styles = ["style1", "style2", "style3", "style4", "style5"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setAnimationStyle(randomStyle);
    localStorage.setItem("animationStyle", randomStyle);
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear everything?")) {
      setBackgroundImage("");
      setFloatingImages([]);
      setAnimationStyle("style1");
      localStorage.removeItem("backgroundImage");
      localStorage.removeItem("floatingImages");
      localStorage.removeItem("animationStyle");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Syztem Control
          </h1>
          <p className="text-slate-400 text-lg">
            Configure your dungeon atmosphere
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Background Image
              </CardTitle>
              <CardDescription className="text-slate-400">
                Set the main background for your dungeon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                  className="hidden"
                  id="background-upload"
                />
                <Label
                  htmlFor="background-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors bg-slate-700/30"
                >
                  {backgroundImage ? (
                    <img
                      src={backgroundImage}
                      alt="Background preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm">Upload Background</span>
                    </div>
                  )}
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shuffle className="w-5 h-5" />
                Animation Controls
              </CardTitle>
              <CardDescription className="text-slate-400">
                Randomize floating image movements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={randomizeAnimation}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Randomize Movement
                </Button>
                <div className="text-sm text-slate-400 bg-slate-700/50 p-4 rounded-lg">
                  Current style:{" "}
                  <span className="text-blue-400 font-mono">
                    {animationStyle}
                  </span>
                </div>
                <Button
                  onClick={clearAll}
                  variant="destructive"
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Everything
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Floating Images
            </CardTitle>
            <CardDescription className="text-slate-400">
              Add images that will float around the dungeon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="floating-upload"
              />
              <Label
                htmlFor="floating-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors bg-slate-700/30"
              >
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">
                    Upload Floating Images (Multiple)
                  </span>
                </div>
              </Label>
            </div>

            {floatingImages.length > 0 && (
              <div className="grid gap-4">
                {floatingImages.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <img
                      src={img.src}
                      alt="Floating preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-300 text-xs mb-1 block">
                          Shape
                        </Label>
                        <Select
                          value={img.shape}
                          onValueChange={(value) =>
                            updateImageShape(img.id, value)
                          }
                        >
                          <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {shapes.map((shape) => (
                              <SelectItem
                                key={shape.value}
                                value={shape.value}
                                className="text-white"
                              >
                                {shape.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300 text-xs mb-1 block">
                          Size
                        </Label>
                        <Select
                          value={img.size.toString()}
                          onValueChange={(value) =>
                            updateImageSize(img.id, parseInt(value))
                          }
                        >
                          <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {sizes.map((size) => (
                              <SelectItem
                                key={size.value}
                                value={size.value.toString()}
                                className="text-white"
                              >
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteImage(img.id)}
                      variant="destructive"
                      size="icon"
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            target="_blank"
          >
            Back to Dungeon
          </a>
        </div>
      </div>
    </div>
  );
}
