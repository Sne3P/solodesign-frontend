'use client'

import CoverMedia from '@/components/ui/CoverMedia'

export default function TestMediaSimple() {
  const testCases = [
    {
      name: "Image placeholder",
      src: "/placeholder.svg",
      type: "image"
    },
    {
      name: "Image existante",
      src: "/logo_white_png.png", 
      type: "image"
    },
    {
      name: "Vidéo MP4",
      src: "/uploads/media_1754661304487_53afi3upb.mp4",
      type: "video"
    },
    {
      name: "Source vide (fallback)",
      src: "",
      type: "fallback"
    },
    {
      name: "Source undefined (fallback)",
      src: undefined,
      type: "fallback"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Test Simple des Médias</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testCases.map((testCase, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-200">
              <CoverMedia
                src={testCase.src || ""}
                alt={testCase.name}
                className="w-full h-full object-cover"
                autoPlay={testCase.type === 'video'}
                muted={true}
                loop={true}
                controls={false}
                fallbackSrc="/placeholder.svg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{testCase.name}</h3>
              <p className="text-sm text-gray-600">Type: {testCase.type}</p>
              <p className="text-xs text-gray-500 break-all">
                Source: {testCase.src || 'vide'}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 max-w-4xl mx-auto bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Attendu :</h2>
        <ul className="space-y-2 text-sm">
          <li>✅ Image placeholder doit s'afficher</li>
          <li>✅ Image existante doit s'afficher</li>
          <li>✅ Vidéo doit se lancer automatiquement (si fichier existe)</li>
          <li>✅ Sources vides doivent afficher le placeholder</li>
        </ul>
      </div>
    </div>
  )
}
