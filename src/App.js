import React, { useState, useEffect, useCallback } from 'react';

// --- CONFIGURATION & UTILITIES ---

// Mock data for the Gallery/Testimonials
const GALLERY_EXAMPLES = [
  { before: 'https://placehold.co/300x300/F97316/ffffff?text=Original+Portrait', after: 'https://placehold.co/300x300/FACC15/000000?text=Pixar+Style+AI' },
  { before: 'https://placehold.co/300x300/1E3A8A/ffffff?text=Original+Landscape', after: 'https://placehold.co/300x300/3B82F6/ffffff?text=Comic+Art+AI' },
  { before: 'https://placehold.co/300x300/4B5563/ffffff?text=Original+Object', after: 'https://placehold.co/300x300/6B7280/ffffff?text=Vintage+Film+AI' },
  { before: 'https://placehold.co/300x300/059669/ffffff?text=Original+Street', after: 'https://placehold.co/300x300/10B981/000000?text=Animation+AI' },
];

const STYLES = ['Pixar', 'Comic Art', 'Animation', 'Realistic', 'Vintage'];
const RESOLUTIONS = ['512x512', '1024x1024', '1536x1536 (Pro)'];

// Custom Colors and Utility Classes
const primaryColor = 'bg-amber-400';
const primaryTextColor = 'text-gray-900';
const accentColor = 'bg-orange-600';
const accentHover = 'hover:bg-orange-500';

/**
 * Custom Toast component simulation
 * @param {{ message: string, type: 'success' | 'error' | 'info', duration: number }}
 */
const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  const ToastContainer = () => {
    if (!toast) return null;

    const baseClasses = "fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded-xl shadow-2xl z-50 text-white font-medium transition-opacity duration-300";
    let colorClass = "";

    switch (toast.type) {
      case 'success':
        colorClass = 'bg-green-600';
        break;
      case 'error':
        colorClass = 'bg-red-600';
        break;
      case 'info':
      default:
        colorClass = 'bg-blue-600';
        break;
    }

    return (
      <div className={`${baseClasses} ${colorClass}`}>
        {toast.message}
      </div>
    );
  };

  return { showToast, ToastContainer };
};

// --- COMPONENTS ---

/**
 * Universal Button Component
 */
const BananaButton = ({ children, className = '', onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      py-3 px-6 rounded-xl font-extrabold text-lg transition duration-300 transform shadow-lg
      ${primaryColor} ${primaryTextColor}
      ${accentHover}
      ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:scale-[1.03] active:scale-[0.98]'}
      ${className}
    `}
  >
    {children}
  </button>
);

/**
 * Header and Navigation Component
 */
const Header = ({ scrollToRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', refName: 'hero' },
    { name: 'Editor', refName: 'editor' },
    { name: 'Gallery', refName: 'gallery' },
  ];

  const handleClick = (refName) => {
    scrollToRef(refName);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-sm shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <a onClick={() => scrollToRef('hero')} className="flex items-center space-x-2 cursor-pointer">
          <span className="text-3xl" role="img" aria-label="banana icon">🍌</span>
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Nano<span className="text-amber-400">Banana</span>Pi
          </h1>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {navItems.map(item => (
            <a key={item.name} onClick={() => handleClick(item.refName)} className="text-gray-300 hover:text-amber-400 transition cursor-pointer">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map(item => (
              <a key={item.name} onClick={() => handleClick(item.refName)} className="block px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition cursor-pointer">
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

/**
 * Hero Section
 */
const HeroSection = ({ scrollToRef }) => {
    // Custom banana animation using CSS keyframes (simulated using Tailwind animation classes)
    const animationClass = "animate-pulse"; // Simple Tailwind animation for lightness
    return (
        <section id="hero" className="min-h-[90vh] flex items-center bg-slate-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                    <h2 className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tighter mb-4">
                        Transform Your Photos with the Power of <span className="text-amber-400">Bananas!</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        NanoBananaPi: AI Photo Editing, Banana-Style. Describe your vision in words—add objects, swap scenes, or go Pixar-crazy. Instant magic awaits.
                    </p>
                    <BananaButton onClick={() => scrollToRef('editor')} className="text-xl shadow-amber-500/50">
                        <span className="flex items-center">
                            Start Editing <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c-3 4 2 6 5 4 .002.002.002.002.004.004.298.298.706.467 1.13.467.424 0 .832-.169 1.13-.467l.37-.37c1.171-1.17 1.171-3.076 0-4.246a3.003 3.003 0 014.242 0c1.171 1.17 1.171 3.076 0 4.246l-4.596 4.596z"></path></svg>
                        </span>
                    </BananaButton>
                </div>
                {/* Simulated Banana Graphic */}
                <div className="flex justify-center items-center relative p-10">
                    <div className={`w-64 h-64 rounded-full ${primaryColor} opacity-20 ${animationClass} absolute`}></div>
                    <div className="text-[12rem] md:text-[18rem] z-10" role="img" aria-label="Animated banana icon">
                        🍌
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * Image Dropzone Component
 */
const Dropzone = ({ onFileDrop, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileDrop(e.target.files[0]);
    }
  };

  return (
    <div
      className={`
        border-4 border-dashed p-8 rounded-2xl transition-all duration-300
        ${isDragging ? 'border-amber-400 bg-slate-700/50' : 'border-gray-700 bg-slate-800'}
        ${uploadedImage ? 'h-32 p-4' : 'h-64'}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        accept="image/jpeg, image/png"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload base image for editing"
      />
      {uploadedImage ? (
        <div className="flex items-center space-x-4 h-full">
          <img src={uploadedImage} alt="Uploaded preview" className="w-20 h-20 object-cover rounded-xl border-2 border-amber-400" />
          <p className="text-gray-300 font-medium">Image Ready! Change or start editing.</p>
        </div>
      ) : (
        <label htmlFor="file-upload" className="flex flex-col items-center justify-center h-full text-center cursor-pointer">
          <svg className="w-10 h-10 mb-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"></path></svg>
          <p className="text-lg text-gray-400 font-semibold mb-1">Drag & Drop Your Image Here</p>
          <p className="text-sm text-gray-500">or <span className="text-amber-400 font-bold">Choose File</span> (JPG/PNG, max 5MB)</p>
        </label>
      )}
    </div>
  );
};

/**
 * Editor Core Section
 */
const EditorSection = ({
  uploadedImage,
  setUploadedImage,
  history,
  setHistory,
  showToast,
  scrollToRef
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [consistency, setConsistency] = useState(70);
  const [resolution, setResolution] = useState(RESOLUTIONS[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  const handleFileDrop = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size exceeds 5MB limit!', 'error');
      return;
    }
    try {
      const dataUri = await fileToDataUri(file);
      setUploadedImage(dataUri);
      showToast('Image uploaded successfully!', 'success');
      setGeneratedImage(null); // Clear previous result
    } catch (error) {
      showToast('Error reading file.', 'error');
      console.error('File reading error:', error);
    }
  };

  /**
   * Handles the image generation process using the Gemini API (gemini-2.5-flash-image-preview).
   */
  const handleGenerate = async () => {
    if (!uploadedImage) {
      showToast('Please upload a base image first.', 'info');
      return;
    }
    if (prompt.trim().length < 5) {
      showToast('Prompt is too short. Describe your vision!', 'info');
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    // 1. Extract base64 data and mime type from the data URI
    const [mimePart, base64Data] = uploadedImage.split(',');
    if (!base64Data) {
        showToast('Error processing image data.', 'error');
        setIsLoading(false);
        return;
    }
    const mimeTypeMatch = mimePart.match(/:(.*?);/);
    // Use the matched MIME type or default to image/jpeg if needed
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg'; 

    // 2. Setup API constants
    const apiKey ="AIzaSyCsleNNyPJybyY20Ck0uuy4n98MfPoqcTM";
    // Using the specified image-to-image model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
    
    // System instructions guide the model's behavior
    const systemPrompt = `You are NanoBananaPi, an expert AI photo editor. Apply the requested style: ${selectedStyle}, and the following prompt: "${prompt}". The consistency setting is ${consistency}%. Prioritize the creative instruction for low consistency and structural fidelity for high consistency. Output only the transformed image.`;

    // 3. Construct the payload for image-to-image generation
    const payload = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: prompt }, // The text instruction
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data // The base64 part of the uploaded image
                        }
                    } // The input image
                ]
            }
        ],
        generationConfig: {
            responseModalities: ['TEXT', 'IMAGE']
        },
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    // 4. API Call with Exponential Backoff
    const maxRetries = 3;
    let newImage = null;
    let retryDelay = 1000;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // Throwing an error to trigger retry or final catch
                throw new Error(`API returned status ${response.status}`);
            }

            const result = await response.json();
            // Find the image part in the response
            const base64DataResult = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

            if (base64DataResult) {
                // Construct the image URL from the returned base64 data
                newImage = `data:image/png;base64,${base64DataResult}`;
                break; // Success! Exit loop.
            } else {
                // Handle cases where API was successful but image data is missing (e.g., safety block)
                throw new Error('Image data not found in response. Generation may have been blocked.');
            }

        } catch (error) {
            if (attempt === maxRetries - 1) {
                showToast(`Image generation failed after multiple attempts. Error: ${error.message}`, 'error');
            } else {
                // Wait with exponential backoff
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                retryDelay *= 2;
            }
        }
    }

    // 5. Update UI states upon successful generation
    if (newImage) {
        setGeneratedImage(newImage);
        showToast('✨ Magic Generated! Check out your new photo.', 'success');

        // Update history
        const newHistoryItem = {
            id: Date.now(),
            prompt,
            style: selectedStyle,
            resultUrl: newImage,
            baseImage: uploadedImage,
        };
        const updatedHistory = [newHistoryItem, ...history.slice(0, 9)]; // Limit to 10
        setHistory(updatedHistory);
        localStorage.setItem('nanoBananaHistory', JSON.stringify(updatedHistory));
    }

    setIsLoading(false);
  };

  const handleReEdit = (item) => {
    setUploadedImage(item.baseImage);
    setPrompt(item.prompt);
    setSelectedStyle(item.style);
    setGeneratedImage(null);
    scrollToRef('editor');
  };

  return (
    <section id="editor" className="min-h-screen bg-slate-900 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-white mb-10 text-center">
          The <span className="text-orange-500">Nano</span> Editor
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: UPLOAD & INPUT */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold text-amber-400">1. Upload Base Image</h3>
            <Dropzone onFileDrop={handleFileDrop} uploadedImage={uploadedImage} />

            <h3 className="text-2xl font-bold text-amber-400">2. Describe Your Vision</h3>
            <textarea
              className="w-full min-h-[120px] p-4 text-lg bg-slate-800 text-white rounded-xl resize-none focus:ring-4 focus:ring-amber-500/50 transition"
              placeholder="E.g., 'Turn this into a comic book hero in a palace wearing a banana suit'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              aria-label="Text prompt for AI image editing"
            />

            <h3 className="text-2xl font-bold text-amber-400">3. Select Style & Options</h3>
            {/* Style Selector */}
            <div className="flex flex-wrap gap-3">
              {STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`
                    py-2 px-4 rounded-full font-medium transition duration-200
                    ${style === selectedStyle
                      ? `${primaryColor} ${primaryTextColor} shadow-lg shadow-amber-500/30`
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }
                  `}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Advanced Options */}
            <details className="p-4 rounded-xl bg-slate-800 text-white mt-4">
              <summary className="font-bold text-xl text-orange-400 cursor-pointer list-none flex justify-between items-center">
                Advanced Options
                <svg className="w-5 h-5 transition-transform duration-300 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
              <div className="pt-4 space-y-6">
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-300">Resolution</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="p-3 rounded-lg bg-slate-700 text-white"
                  >
                    {RESOLUTIONS.map(res => <option key={res} value={res}>{res}</option>)}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-300 flex justify-between">
                    Consistency Boost (Fidelity to Original): <span className="font-mono text-amber-400">{consistency}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={consistency}
                    onChange={(e) => setConsistency(e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Creative Freedom</span>
                    <span>High Fidelity</span>
                  </div>
                </div>
              </div>
            </details>

            <div className="pt-6">
              <BananaButton
                onClick={handleGenerate}
                disabled={isLoading || !uploadedImage || prompt.trim().length < 5}
                className="w-full text-2xl py-4 shadow-2xl shadow-amber-500/50 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bananas are brewing...
                  </span>
                ) : (
                  <>
                    Generate Magic!
                    <span className="ml-2 text-3xl">✨</span>
                  </>
                )}
              </BananaButton>
            </div>
          </div>

          {/* RIGHT COLUMN: RESULT & HISTORY */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-3">4. Result Preview</h3>
            <div className="aspect-square w-full bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center border-4 border-dashed border-gray-700">
              {generatedImage ? (
                <a href={generatedImage} download="nanobanana_ai_edit.png" className="group block relative w-full h-full">
                  <img
                    src={generatedImage}
                    alt="AI Generated Result"
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="text-white text-xl font-bold p-3 bg-green-600 rounded-xl">Download Image</span>
                  </div>
                </a>
              ) : uploadedImage ? (
                <p className="text-gray-500 text-lg p-4 text-center">Ready to generate. Click the button!</p>
              ) : (
                <p className="text-gray-500 text-lg p-4 text-center">Upload an image to begin the magic.</p>
              )}
            </div>

            {/* History Panel */}
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-3 mt-10">Past Generations ({history.length})</h3>
            <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
              {history.length > 0 ? history.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 p-3 rounded-xl flex items-center justify-between transition hover:bg-slate-700 cursor-pointer"
                  onClick={() => handleReEdit(item)}
                >
                  <div className="flex items-center space-x-3">
                    <img src={item.resultUrl} alt="History result" className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="text-sm font-medium text-white line-clamp-1">{item.prompt}</p>
                      <p className="text-xs text-amber-400">{item.style}</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-amber-400 font-medium ml-2 shrink-0">
                    Re-Edit
                  </button>
                </div>
              )) : (
                <p className="text-gray-500 text-sm italic">Your history will appear here once you generate your first image.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Gallery & Testimonials Section
 */
const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-white text-center mb-16">
          The <span className="text-amber-400">Banana</span> Gallery
        </h2>

        {/* Before & After Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {GALLERY_EXAMPLES.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:scale-[1.03] group relative">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={item.before} alt="Before AI Edit" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-xs font-bold rounded-lg text-white">BEFORE</span>
                </div>
                <div className="relative">
                  <img src={item.after} alt="After AI Edit" className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 px-2 py-1 bg-amber-400/90 text-xs font-bold rounded-lg text-gray-900">AFTER AI</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="text-3xl font-bold text-orange-400 mb-8 text-center">What People Say</h3>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { quote: "Mind-blowing! My cat's now a Pixar star. Effortless photo editing done right.", author: "@CreativeCat" },
            { quote: "The consistency boost works wonders. High fidelity edits without losing the original vibe.", author: "@DigitalDruid" },
            { quote: "Intuitive UI and the banana theme is genius. I generated my entire album cover in 5 minutes.", author: "@PixelPioneer" },
          ].map((testimonial, index) => (
            <div key={index} className="p-6 bg-slate-900 rounded-2xl shadow-xl border-t-4 border-amber-400">
              <p className="text-lg italic text-gray-300 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-right text-orange-400">— {testimonial.author}</p>
            </div>
          ))}
        </div>

        {/* CTA and Disclaimer */}
        <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-700">
          <h3 className="text-3xl font-bold text-white mb-4">Join the Banana Revolution</h3>
          <p className="text-gray-400 mb-6">Sign up for our newsletter to get the latest AI style updates.</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              aria-label="Newsletter email signup"
              className="flex-grow p-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <BananaButton type="submit">Subscribe</BananaButton>
          </form>
          <p className="mt-8 text-xs italic text-gray-500">
            Disclaimer: NanoBananaPi is not affiliated with, endorsed by, or associated with Google in any way. The 'Google Nano Banana AI API' referenced here is a fictional integration created for demonstration and entertainment purposes only.
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer Component
 */
const Footer = ({ scrollToRef }) => (
  <footer className="bg-slate-950 text-gray-400 py-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 border-b border-gray-800 pb-8 mb-8">
        <div>
          <a onClick={() => scrollToRef('hero')} className="flex items-center space-x-2 cursor-pointer mb-4">
            <span className="text-2xl" role="img" aria-label="banana icon">🍌</span>
            <h1 className="text-2xl font-black text-white tracking-tighter">Nano<span className="text-amber-400">Banana</span>Pi</h1>
          </a>
          <p className="text-sm">Effortless AI photo manipulation, banana-style.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-white mb-2">Navigation</h4>
          <a onClick={() => scrollToRef('hero')} className="block text-sm hover:text-amber-400 cursor-pointer">Home</a>
          <a onClick={() => scrollToRef('editor')} className="block text-sm hover:text-amber-400 cursor-pointer">Editor</a>
          <a onClick={() => scrollToRef('gallery')} className="block text-sm hover:text-amber-400 cursor-pointer">Gallery</a>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-white mb-2">Resources</h4>
          <a href="#" className="block text-sm hover:text-amber-400">About</a>
          <a href="#" className="block text-sm hover:text-amber-400">API Docs (Placeholder)</a>
          <a href="#" className="block text-sm hover:text-amber-400">Privacy Policy</a>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-white mb-2">Connect</h4>
          <div className="flex space-x-4">
            {/* Mock Social Icons using Lucide-React equivalent (inline SVG) */}
            <a href="#" aria-label="Twitter" className="hover:text-amber-400 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M18 4h2v5h-2M4 18v2h5v-2M18 18h2v-5h-2M12 2v20M20 12H4"></path></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-amber-400 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1.75c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zM12 1a11 11 0 100 22 11 11 0 000-22zM17.5 6.5h.01"></path></svg>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-600 mt-4">
        © {new Date().getFullYear()} NanoBananaPi. All rights reserved.
        <br/>
        <strong className="text-xs text-red-400 mt-2 block">
          DISCLAIMER: This is a fictional project for demonstration and entertainment purposes only. Not affiliated with Google.
        </strong>
      </p>
    </div>
  </footer>
);

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [history, setHistory] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { showToast, ToastContainer } = useToast();

  const sectionRefs = {
    hero: React.useRef(null),
    editor: React.useRef(null),
    gallery: React.useRef(null),
  };

  // Load history from localStorage and inject global styles on initial load
  useEffect(() => {
    // History loading logic
    const savedHistory = localStorage.getItem('nanoBananaHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error parsing history from localStorage", e);
      }
    }

    // --- Font Loading and Global Style Injection (FIX for jsx/global warning) ---
    // 1. Load Google Fonts via link tag
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=Roboto:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Apply font families using standard CSS injection
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      body {
        font-family: 'Roboto', sans-serif;
      }
      h1, h2, h3, .font-extrabold {
        font-family: 'Poppins', sans-serif;
      }
    `;
    document.head.appendChild(styleTag);

    // Cleanup function
    return () => {
        document.head.removeChild(link);
        document.head.removeChild(styleTag);
    };
  }, []); // Empty dependency array means this runs only on mount

  // Function to scroll to a specific section
  const scrollToRef = (refName) => {
    const ref = sectionRefs[refName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <ToastContainer />
      <Header scrollToRef={scrollToRef} />

      <main className="flex flex-col">
        <div ref={sectionRefs.hero}>
          <HeroSection scrollToRef={scrollToRef} />
        </div>
        <div ref={sectionRefs.editor}>
          <EditorSection
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            history={history}
            setHistory={setHistory}
            showToast={showToast}
            scrollToRef={scrollToRef}
          />
        </div>
        <div ref={sectionRefs.gallery}>
          <GallerySection />
        </div>
      </main>

      <Footer scrollToRef={scrollToRef} />
    </div>
  );
}

