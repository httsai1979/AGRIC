import React from 'react';
import { BookOpen } from 'lucide-react';
import { STORIES } from '../data/mockData';

const StoriesView = () => (
  <div className="pb-24 animate-in fade-in duration-300 bg-stone-50 min-h-screen">
    <div className="bg-white pt-6 pb-4 px-4 shadow-sm mb-4">
      <h1 className="text-2xl font-black text-emerald-800 flex items-center">
        <BookOpen className="w-6 h-6 mr-2" /> 田間故事與食農
      </h1>
      <p className="text-xs text-gray-500 mt-2 font-medium">傳遞真實的田間故事，看見小農在友善土地上的堅持。</p>
    </div>
    <div className="px-4 space-y-5">
      {STORIES.map(story => (
        <div key={story.id} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${story.type === '活動' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {story.type}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">人物：{story.key_figures}</span>
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-2 leading-tight">{story.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{story.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StoriesView;
