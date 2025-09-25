import React from 'react';


export const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Fashion Store
                </h1>
                <p className="text-sm text-gray-300">Premium AI-Powered Fashion</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <span className="text-gray-300">Free shipping on orders $75+</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">30-day returns</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
              <svg width="16" height="16" viewBox="0 0 238 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3703_10142)">
                  <mask id="mask0_3703_10142" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="238" height="58">
                    <path d="M237.885 0H0.00390625V58H237.885V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_3703_10142)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M237.709 11.0512L230.767 18.2955C225.827 23.4374 223.647 25.8692 223.268 26.7558C222.963 27.4145 222.507 28.9851 222.254 30.2518C222 31.5185 221.949 33.3933 222.128 34.4828C222.331 35.5468 222.761 37.1431 223.115 38.0552C223.697 39.4487 224.685 40.589 237.707 54.1208L236.77 55.2099C236.212 55.8685 235.579 56.2991 235.2 56.2737C234.768 56.2482 232.438 54.1703 227.396 49.2288C220.58 42.5642 220.151 42.1842 218.479 41.5758C217.465 41.2209 215.565 40.891 214.196 40.8401C212.803 40.8145 210.929 41.0167 209.966 41.3205C209.029 41.6496 207.508 42.3588 206.622 42.9412C205.709 43.549 202.416 46.5885 192.358 56.6444L189.824 53.857L204.265 38.9125L205 36.4045C205.405 35.0364 205.685 33.035 205.608 31.9963C205.557 30.9322 205.154 29.1587 204.748 28.0438C204.038 26.0168 203.886 25.8649 189.826 11.2941L192.359 8.50781L199.605 15.6032C206.091 21.9383 207.003 22.7493 208.548 23.4338C209.485 23.8138 211.588 24.1945 213.184 24.2707C214.983 24.3472 216.883 24.1196 218.149 23.6637C220.228 22.9548 220.228 22.9548 227.396 15.9386L235.304 9C235.304 9 236.5 10 237.709 11.0512Z" fill="#AB0908"/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_3703_10142">
                    <rect width="237.881" height="58" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="text-xs text-gray-300">Powered by ShootX AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};