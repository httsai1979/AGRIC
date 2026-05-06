import codecs

with open('src/views/HomeView.jsx', 'rb') as f:
    content = f.read()

start_marker = b'<h3 className="text-lg font-black text-white mb-2 leading-tight">'
end_marker = b'Agric Social Enterprise'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_tail = b'''<h3 className="text-lg font-black text-white mb-2 leading-tight">\xe9\x87\x8f\xe8\xba\xab\xe6\x89\x93\xe9\x80\xa0\xe4\xbc\x81\xe6\xa5\xad\xe5\xb0\x88\xe5\xb1\xac\xe6\x96\xb9\xe6\xa1\x88</h3>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-12 flex flex-col items-center pb-8 px-4 text-center">
        <div className="flex gap-6 mb-8">
          <a href={BRAND_CONTACT.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm active:scale-90 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href={BRAND_CONTACT.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm active:scale-90 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975-.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
          </a>
        </div>
        <div className="max-w-[280px]">
          <h4 className="text-gray-900 font-black mb-2 flex items-center justify-center gap-2">
            \xe9\x97\x9c\xe6\xb3\xa8\xe9\x98\xbf\xe5\x8f\xa4\xe5\x8a\x9b <Leaf className="w-5 h-5 text-emerald-600" />
          </h4>
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-4">
            \xe5\x8a\xa0\xe5\x85\xa5\xe9\x98\xbf\xe5\x8f\xa4\xe5\x8a\x9b LINE \xe5\xae\x98\xe6\x96\xb9\xe5\xb8\xb3\xe8\x99\x9f\xef\xbc\x8c\xe7\x8d\xb2\xe5\x8f\x96\xe7\xac\xac\xe4\xb8\x80\xe6\x89\x8b\xe6\x9c\x89\xe6\xa9\x9f\xe8\xbe\xb2\xe7\x94\xa2\xe5\x84\xaa\xe6\x83\xa0\xe8\x88\x87\xe7\x94\xb0\xe9\x96\x93\xe7\x94\x9f\xe6\xb4\xbb\xe9\xa9\x9a\xe5\x96\x9c\xef\xbc\x81
          </p>
          <a 
            href={BRAND_CONTACT.line} 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-[#06C755] text-white font-black px-8 py-3 rounded-2xl text-[13px] shadow-xl shadow-green-600/20 active:scale-95 transition-all"
          >
            \xe7\xab\x8b\xe5\x8d\xb3\xe5\x8a\xa0\xe5\x85\xa5 LINE \xe5\xa5\xbd\xe5\x8f\x8b
          </a>
        </div>
        <p className="mt-12 text-[10px] text-gray-300 font-bold tracking-widest uppercase">
          Agric Social Enterprise'''

    new_content = content[:start_idx] + new_tail + content[end_idx + len(end_marker):]
    
    # Write back, ensure it's valid UTF-8
    try:
        new_content.decode('utf-8')
    except UnicodeDecodeError:
        print("Still has decode errors, replacing...")
        new_content = new_content.decode('utf-8', 'replace').encode('utf-8')
        
    with open('src/views/HomeView.jsx', 'wb') as f:
        f.write(new_content)
    print("Replaced successfully")
else:
    print("Markers not found", start_idx, end_idx)
