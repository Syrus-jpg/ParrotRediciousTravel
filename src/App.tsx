import React, { useState, useEffect, useRef } from 'react';
import VideoBackground from './components/common/VideoBackground';
import './App.css';

/**
 * Main Application Component for Parrot Redicious Travel
 */
const App: React.FC = () => {
  // Loading state control
  const [isLoading, setIsLoading] = useState(true);
  
  // Title display state control
  const [showTitle, setShowTitle] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  
  // Game steps: parrot selection, naming parrot, enter user name, personality selection, planet selection, traveling or second stage
  type GameStep = 'selection' | 'second' | 'naming_parrot' | 'naming_user' | 'personality' | 'planet_selection' | 'traveling' | 'final_postcard';
  const [gameStep, setGameStep] = useState<GameStep>('selection');
  
  // Selected parrot type
  const [selectedParrot, setSelectedParrot] = useState<'alexandrine' | 'caique' | 'cockatoo' | null>(null);
  
  // Parrot name and user name
  const [parrotName, setParrotName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  
  // Selected personality for the parrot
  const [selectedPersonality, setSelectedPersonality] = useState<string>('');
  
  // Selected planet/Reddit community
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  
  // Loading states for API calls
  const [isLoadingRedditData, setIsLoadingRedditData] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  // Reference for planet hover tooltip
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Input references for auto-focus
  const parrotNameInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  
  // Current view display
  const [currentView, setCurrentView] = useState<'main' | 'postcards' | 'medals' | 'fainted' | 'holyjuice' | 'final_postcard'>('main');
  
  // Previous view for navigation back
  const [previousView, setPreviousView] = useState<'main' | 'postcards' | 'medals' | 'fainted' | 'holyjuice' | 'final_postcard'>('main');
  
  // Postcard data (mock)
  const [postcards, setPostcards] = useState<Array<CompletePostcard>>([]);
  
  // Current postcard index
  const [currentPostcardIndex, setCurrentPostcardIndex] = useState(0);
  
  // Timer for fainted video playback
  const [faintedTimer, setFaintedTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Holy Juice counter
  const [holyJuice, setHolyJuice] = useState<number>(0);
  
  // Travel progress states
  const [travelProgress, setTravelProgress] = useState(0);
  const [isAlmostBack, setIsAlmostBack] = useState(false);
  
  // Available Reddit communities/planets
  const redditPlanets = [
    { id: 'askreddit', name: 'r/AskReddit', image: 'askreddit_planet.png' },
    { id: 'funny', name: 'r/funny', image: 'funny_planet.png' },
    { id: 'games', name: 'r/Games', image: 'game_planet.png' },
    { id: 'music', name: 'r/Music', image: 'music_planet.png' },
    { id: 'technology', name: 'r/technology', image: 'technology_planet.png' },
    { id: 'science', name: 'r/science', image: 'science_planet.png' },
    { id: 'worldnews', name: 'r/worldnews', image: 'worldnews_planet.png' }
  ];
  
  // Is in planet selection confirmation state
  const [isConfirmingPlanet, setIsConfirmingPlanet] = useState<boolean>(false);
  
  // Reddit post data type
  type RedditPost = {
    title: string;
    subreddit: string;
    permalink: string;
    id: string;
    content?: string;
  };

  // Generated content type
  type GeneratedContent = {
    imageUrl: string;
    parrotComment: string;
  };

  // Add states for Reddit post and generated content
  const [redditPost, setRedditPost] = useState<RedditPost>({
    title: '',
    subreddit: '',
    permalink: '',
    id: ''
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({
    imageUrl: '',
    parrotComment: ''
  });

  // Add a complete postcard type that combines Reddit post and generated content
  type CompletePostcard = {
    redditPost: RedditPost;
    imageUrl: string;
    parrotComment: string;
    createdAt: Date;
  };
  
  // Add a new state to track if the current postcard is ready to show
  const [currentPostcardReady, setCurrentPostcardReady] = useState(false);
  
  // Focus input fields when step changes
  useEffect(() => {
    if (gameStep === 'naming_parrot' && parrotNameInputRef.current) {
      setTimeout(() => parrotNameInputRef.current?.focus(), 100);
    }
    if (gameStep === 'naming_user' && userNameInputRef.current) {
      setTimeout(() => userNameInputRef.current?.focus(), 100);
    }
  }, [gameStep]);
  
  // Check and increase holy juice on component load
  useEffect(() => {
    // Simulate loading process
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Check last date holy juice was obtained
    const lastJuiceDate = localStorage.getItem('lastJuiceDate');
    const today = new Date().toDateString();
    
    if (lastJuiceDate !== today) {
      // If it's a new day, increase holy juice
      const currentJuice = parseInt(localStorage.getItem('holyJuice') || '0');
      const newAmount = currentJuice + 1;
      setHolyJuice(newAmount);
      localStorage.setItem('holyJuice', newAmount.toString());
      localStorage.setItem('lastJuiceDate', today);
    } else {
      // If it's the same day, load saved amount
      const savedJuice = parseInt(localStorage.getItem('holyJuice') || '0');
      setHolyJuice(savedJuice);
    }
    
    return () => {
      clearTimeout(loadingTimer);
      if (faintedTimer) clearTimeout(faintedTimer);
    };
  }, []);
  
  // Handle title animation
  useEffect(() => {
    if (!isLoading && currentView === 'main') {
      // Title fades out after 5 seconds
      const titleTimer = setTimeout(() => {
        setShowTitle(false);
        // Display subtitle after title disappears
        setTimeout(() => {
          setShowSubtitle(true);
        }, 1000);
      }, 5000);
      
      return () => clearTimeout(titleTimer);
    }
  }, [isLoading, currentView]);
  
  // Handle parrot selection
  const handleParrotSelect = (parrot: 'alexandrine' | 'caique' | 'cockatoo') => {
    setSelectedParrot(parrot);
    setGameStep('second');
  };
  
  // Handle navigation button clicks
  const handleNavClick = (view: 'postcards' | 'medals' | 'fainted' | 'holyjuice' | 'final_postcard') => {
    setPreviousView(currentView);
    setCurrentView(view);
    
    // If fainted view, set timer to switch to drinked video
    if (view === 'fainted') {
      const timer = setTimeout(() => {
        // Simulate video completion, switch to drinked video
        setFaintedTimer(null);
      }, 5000); // Assuming fainted video ends after 5 seconds
      
      setFaintedTimer(timer);
    }
  };
  
  // Handle back button click
  const handleBackClick = () => {
    setCurrentView('main');
  };
  
  // Handle parrot naming next click
  const handleParrotNameNext = () => {
    if (parrotName.trim() && parrotName.length <= 20) {
      setGameStep('naming_user');
    }
  };
  
  // Handle user naming next click
  const handleUserNameNext = () => {
    if (userName.trim() && userName.length <= 20) {
      setGameStep('personality');
    }
  };
  
  // Handle personality selection
  const handlePersonalitySelect = (personality: string) => {
    setSelectedPersonality(personality);
  };
  
  // Handle personality selection next click
  const handlePersonalityNext = () => {
    if (selectedPersonality) {
      setGameStep('planet_selection');
    }
  };
  
  // Handle planet selection
  const handlePlanetSelect = (planetId: string) => {
    setSelectedPlanet(planetId);
    setIsConfirmingPlanet(true);
  };
  
  // Handle planet selection next click
  const handlePlanetNext = () => {
    if (selectedPlanet && isConfirmingPlanet) {
      // Reset states
      setCurrentPostcardReady(false);
      setTravelProgress(0);
      setIsAlmostBack(false);
      
      setGameStep('traveling');
      setIsLoadingRedditData(true);
      setIsGeneratingImage(true);
      
      // Simulate Reddit API call (first half of total time)
      setTimeout(() => {
        // Mock Reddit API response with content
        const mockRedditPost: RedditPost = {
          title: "Boiled coffee in a pot contains high levels of the worst of cholesterol-elevating substances. Coffee from most coffee machines in workplaces also contains high levels of cholesterol-elevating substances. However, regular paper filter coffee makers filter out most of these substances, finds study.",
          subreddit: selectedPlanet,
          permalink: `https://www.reddit.com/r/${selectedPlanet}/comments/1jjfwlv/boiled_coffee_in_a_pot_contains_high_levels_of/`,
          id: '1jjfwlv',
          content: "Researchers from Gothenburg University in Sweden found that when you boil coffee in a pot, the harmful LDL cholesterol-raising diterpenes – cafestol and kahweol – remain in the brew. This type of brewing, along with using a cafetière (French press), is linked to higher cholesterol levels. However, paper filters effectively remove these substances, making filtered coffee a healthier option for cardiovascular health."
        };
        
        setRedditPost(mockRedditPost);
        setIsLoadingRedditData(false);
        
        console.log(`Reddit API simulation complete for ${selectedPlanet}. Starting image generation...`);
        console.log(`Selected parrot: ${selectedParrot}, Selected personality: ${selectedPersonality}`);
        
        // Simulate ChatGPT API call for parrot comment
        let mockParrotComment = "";
        
        // Generate different comments based on selected personality
        switch(selectedPersonality) {
          case 'nerd':
            mockParrotComment = `Dear ${userName},\n\nFascinating data on coffee's biochemical properties! The diterpenes cafestol and kahweol demonstrate remarkable lipid-solubility characteristics, binding effectively to LDL receptors. Paper filtration removes approximately 98.7% of these compounds through simple mechanical separation. I've calculated that switching from French press to paper filtered coffee could reduce serum cholesterol by 7.2mg/dL over 6 months. Simply extraordinary!\n\nLove u,\n${parrotName}`;
            break;
          case 'romantic':
            mockParrotComment = `Dear ${userName},\n\nLike a forbidden love story, the coffee calls to us with its dark temptations. The paper filter, a silent guardian, shields our hearts from the bitter compounds that seek to taint our very essence. When I sip my filtered coffee, I think of you, pure and true, just like my cholesterol levels shall remain. The steam rises like poetry from my cup, whispering secrets of health and longevity.\n\nLove u,\n${parrotName}`;
            break;
          case 'emo':
            mockParrotComment = `Dear ${userName},\n\nEvery morning I stare into the dark abyss of my coffee cup and wonder if it's worth it. Now I learn even my coffee wants me dead, filling my veins with cholesterol... just another betrayal. I'll use paper filters now, I guess, but does it even matter in this fleeting existence? At least when my heart breaks, it won't be from cardiovascular disease.\n\nLove u,\n${parrotName}`;
            break;
          case 'crazy':
            mockParrotComment = `Dear ${userName},\n\nYou won't believe it, but after this cup of coffee, I literally blasted off to the afterlife! My soul is now chilling on the filter paper! Cholesterol? Nah, my blood is now pure Colombian dark roast! Scientists say brewing coffee is bad for you? They've never seen me doing tap dance at 3 AM in a coffee shop! But don't worry, I've got the filter paper as my new headscarf now!\n\nLove u,\n${parrotName}`;
            break;
          case 'free-associative':
            mockParrotComment = `Dear ${userName},\n\nCoffee filters... reminds me of that time I tried to use one as a hat! Speaking of hats, did you know cholesterol is like tiny little hats for your blood cells? Or maybe they're more like tiny boats? Oh! Coffee! I once saw a boat made of coffee beans, or was that in a dream after drinking too much coffee? Filter paper makes me think of origami... have you ever tried making a cholesterol molecule out of origami?\n\nLove u,\n${parrotName}`;
            break;
          case 'chatterbox':
            mockParrotComment = `Dear ${userName},\n\nOMG did you hear about the coffee thing?? So I was drinking coffee ALL MORNING and then I saw this article and I was like WHAT?? I could be KILLING myself with cholesterol but then I checked and I DO use paper filters thank goodness but can you IMAGINE if I didn't?? I would have to change EVERYTHING about my morning routine and you KNOW how I am about routines and coffee and morning and talking and breathing and existing and oh wow coffee is so good have you had coffee today I've had SEVEN CUPS!!\n\nLove u,\n${parrotName}`;
            break;
          default:
            mockParrotComment = `Dear ${userName},\n\nInteresting findings about coffee! I'll definitely be sticking with paper filters from now on. It's amazing how something so simple can make such a difference to health. Thanks for sharing this with me - I'm going to tell all my bird friends about it too!\n\nLove u,\n${parrotName}`;
        }
        
        // Simulate Midjourney API generating an image
        setTimeout(() => {
          // Create mock generated content
          const mockGeneratedContent: GeneratedContent = {
            imageUrl: "/assets/images/parrots/cockatoo_mock_postcard.png", // This would be the URL from the Midjourney API
            parrotComment: mockParrotComment
          };
          
          setGeneratedContent(mockGeneratedContent);
          
          // Create a new complete postcard
          const newPostcard: CompletePostcard = {
            redditPost: mockRedditPost,
            imageUrl: mockGeneratedContent.imageUrl,
            parrotComment: mockGeneratedContent.parrotComment,
            createdAt: new Date()
          };
          
          // Add to postcards collection
          setPostcards(prevPostcards => [newPostcard, ...prevPostcards]);
          
          // Set current postcard as ready to show
          setCurrentPostcardReady(true);
          setIsGeneratingImage(false);
          
          console.log('Image generation and comment creation complete.');
          // After all content is generated and ready
          setCurrentView('final_postcard');
        }, 7000); // Second half of the loading time
        
      }, 7000); // First half of the loading time
    }
  };
  
  // Handle planet hover to show tooltip
  const handlePlanetHover = (event: React.MouseEvent, planetName: string) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'block';
      tooltipRef.current.style.left = `${event.clientX + 15}px`;
      tooltipRef.current.style.top = `${event.clientY - 50}px`;
      tooltipRef.current.textContent = planetName;
    }
  };
  
  // Handle planet hover end to hide tooltip
  const handlePlanetLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }
  };
  
  // Handle planet selection back button
  const handlePlanetSelectionBack = () => {
    setIsConfirmingPlanet(false);
    setGameStep('personality');
  };
  
  // Handle cancel planet confirmation
  const handleCancelPlanetConfirmation = () => {
    setIsConfirmingPlanet(false);
    setSelectedPlanet('');
  };
  
  // Handle traveling back button
  const handleTravelingBack = () => {
    setGameStep('planet_selection');
  };
  
  // Handle postcard navigation
  const handlePostcardChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPostcardIndex((prevIndex) => 
        prevIndex === postcards.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentPostcardIndex((prevIndex) => 
        prevIndex === 0 ? postcards.length - 1 : prevIndex - 1
      );
    }
  };
  
  // Add this function to App component
  const logVideoState = (id: string) => {
    const video = document.querySelector(`#${id}`) as HTMLVideoElement;
    if (video) {
      console.log(`Video ${id} state:`, {
        currentSrc: video.currentSrc,
        error: video.error,
        readyState: video.readyState,
        networkState: video.networkState,
        paused: video.paused
      });
      // Attempt to play if paused
      if (video.paused) {
        video.play().catch(e => console.error('Play failed:', e));
      }
    } else {
      console.error(`Video element ${id} not found`);
    }
  };
  
  // Handle back button from parrot naming to selection screen
  const handleParrotNamingBack = () => {
    setGameStep('second');
  };

  // Handle back button from user naming to parrot naming screen
  const handleUserNamingBack = () => {
    setGameStep('naming_parrot');
  };
  
  // Handle back button from personality selection to user naming screen
  const handlePersonalityBack = () => {
    setGameStep('naming_user');
  };
  
  // Add this function to format the parrot comment based on personality
  const formatParrotComment = (comment: string, userName: string, parrotName: string): string => {
    // Ensure comment starts with greeting and ends with signature
    if (!comment.startsWith(`Dear ${userName}`)) {
      comment = `Dear ${userName},\n${comment}`;
    }
    
    if (!comment.endsWith(`${parrotName}`)) {
      // Check if it has the "Love u," part
      if (!comment.includes("Love u,")) {
        comment = `${comment}\n\nLove u,\n${parrotName}`;
      } else if (!comment.endsWith(parrotName)) {
        // If it has "Love u," but not the parrot name
        // Use a regular expression without 's' flag for better compatibility
        comment = comment.replace(/Love u,[\s\S]*$/, `Love u,\n${parrotName}`);
      }
    }
    
    return comment;
  };
  
  // Loading animation
  if (isLoading) {
    return (
      <div className="game-container">
        <div className="loading-screen">
          <h2>Parrot Redicious Travel</h2>
          <p>Loading your adventure...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }
  
  // Render navigation icons
  const renderNavIcons = () => (
    <div className="nav-icons">
      <button 
        className="icon-button" 
        onClick={() => handleNavClick('postcards')}
        title="Postcards"
      >
        ✉️
      </button>
      <button 
        className="icon-button" 
        onClick={() => handleNavClick('medals')}
        title="Medals"
      >
        🏆
      </button>
      <button 
        className="icon-button" 
        onClick={() => handleNavClick('fainted')}
        title="Parrot with Holy Juice"
      >
        🦜
      </button>
      <button 
        className="icon-button" 
        onClick={() => handleNavClick('holyjuice')}
        title="Holy Juice"
      >
        🍷
      </button>
    </div>
  );
  
  // Traveling screen - parrot going to selected planet
  if (gameStep === 'traveling') {
    // Get selected planet info
    const selectedPlanetObj = redditPlanets.find(planet => planet.id === selectedPlanet);
    const parrotType = selectedParrot || 'alexandrine'; // Default to alexandrine if undefined
    const planetObj = selectedPlanetObj || { id: 'funny', name: 'r/funny', image: 'funny_planet.png' };
    
    // Define the total loading time constant
    const totalLoadingTime = 14000; // Total time in ms
    
    // 使用useEffect处理进度更新
    const [loadingProgress, setLoadingProgress] = useState(0);
    
    useEffect(() => {
      // 在traveling状态下重置进度
      setLoadingProgress(0);
      
      // 设置定时器更新进度
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          // 当达到100%时停止
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, totalLoadingTime / 100);
      
      // 清除函数
      return () => clearInterval(interval);
    }, [gameStep]);
    
    return (
      <div className="game-container" 
        style={{
          backgroundImage: "url('/assets/images/planets/universe_background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}
      >
        {renderNavIcons()}
        
        <div className="travel-scene">
          <div className="travel-content">
            {/* Left side - Selected parrot */}
            <div className="parrot-container" style={{ 
              position: 'absolute', 
              left: '25%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}>
              <img 
                src={`/assets/images/parrots/${parrotType}_holyjuice.png`} 
                alt={`${parrotType} parrot with holy juice`}
                style={{
                  width: '200px',
                  height: '200px',
                  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.9))'
                }}
              />
            </div>
            
            {/* Right side - Selected planet with rotation */}
            <div className="planet-container rotate-slow" style={{ 
              position: 'absolute', 
              right: '25%',
              top: '50%',
              transform: 'translate(50%, -50%)',
              zIndex: 10
            }}>
              <img 
                src={`/assets/images/planets/${planetObj.image}`}
                alt={planetObj.name}
                style={{
                  width: '250px',
                  height: '250px',
                  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.9))'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* 确保加载消息容器显示在底部中间 */}
        <div className="travel-message" style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '700px',
          backgroundColor: 'rgba(0, 0, 20, 0.7)',
          borderRadius: '15px',
          padding: '25px',
          color: 'white',
          textAlign: 'center',
          zIndex: 100,
          boxShadow: '0 0 20px rgba(0, 0, 150, 0.3)',
          border: '1px solid rgba(100, 100, 255, 0.2)'
        }}>
          <div className="loading-indicator">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="loading-text" style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '15px 0' }}>
              {isAlmostBack 
                ? "Your parrot's almost back! What will it bring 🎁 🦜?" 
                : "During your parrot's travel... Please wait patiently ⌛️."}
            </p>
            <div className="loading-status">
              {isLoadingRedditData && <p>Fetching interesting posts from Reddit...</p>}
              {!isLoadingRedditData && isGeneratingImage && <p>Creating images based on what your parrot found...</p>}
            </div>
            
            {/* Progress bar - with inline styles to ensure visibility */}
            <div style={{
              width: '90%',
              maxWidth: '600px',
              height: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              margin: '25px auto',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 10px rgba(0, 0, 150, 0.3) inset',
              border: '1px solid rgba(100, 100, 255, 0.3)'
            }}>
              <div style={{
                height: '100%',
                width: `${travelProgress}%`,
                backgroundColor: '#4a9af5',
                backgroundImage: 'linear-gradient(to right, #4a9af5, #7c4dff)',
                borderRadius: '10px',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 15px rgba(122, 77, 255, 0.7)'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
                fontSize: '12px'
              }}>{travelProgress}%</div>
            </div>
          </div>
          
          <button 
            className="back-button" 
            onClick={handleTravelingBack}
            style={{ marginTop: '20px' }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  
  // Planet Selection step
  if (gameStep === 'planet_selection') {
    return (
      <div className="game-container" style={{
        backgroundImage: "url('/assets/images/planets/universe_background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {renderNavIcons()}
        
        <div className="planet-tooltip" ref={tooltipRef} style={{ display: 'none' }}></div>
        
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Earth (funny) - center left */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '30%',
              top: '35%',
              width: '180px',
              height: '180px',
              zIndex: 10,
              animation: 'float1 20s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/funny')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('funny')}
          >
            <img 
              src="/assets/images/planets/funny_planet.png" 
              alt="r/funny" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Jupiter (technology) - center right */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '60%',
              top: '30%',
              width: '200px',
              height: '200px',
              zIndex: 9,
              animation: 'float2 25s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/technology')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('technology')}
          >
            <img 
              src="/assets/images/planets/technology_planet.png" 
              alt="r/technology" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Sun (science) - bottom center */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '45%',
              top: '55%',
              width: '160px',
              height: '160px',
              zIndex: 11,
              animation: 'float3 22s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/science')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('science')}
          >
            <img 
              src="/assets/images/planets/science_planet.png" 
              alt="r/science" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Moon (askreddit) - top left */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '15%',
              top: '15%',
              width: '140px',
              height: '140px',
              zIndex: 8,
              animation: 'float4 18s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/AskReddit')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('askreddit')}
          >
            <img 
              src="/assets/images/planets/askreddit_planet.png" 
              alt="r/AskReddit" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Blue planet (worldnews) - top right */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '75%',
              top: '15%',
              width: '150px',
              height: '150px',
              zIndex: 7,
              animation: 'float5 23s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/worldnews')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('worldnews')}
          >
            <img 
              src="/assets/images/planets/worldnews_planet.png" 
              alt="r/worldnews" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Blue-gold planet (music) - moved to middle right side to avoid text overlap */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '82%',
              top: '50%',
              width: '145px',
              height: '145px',
              zIndex: 5,
              animation: 'float7 21s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/Music')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('music')}
          >
            <img 
              src="/assets/images/planets/music_planet.png" 
              alt="r/Music" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Ice planet (games) - top center */}
          <div 
            className="planet"
            style={{
              position: 'absolute',
              left: '50%',
              top: '10%',
              width: '130px',
              height: '130px',
              zIndex: 4,
              animation: 'float8 17s infinite ease-in-out'
            }}
            onMouseMove={(e) => handlePlanetHover(e, 'r/Games')}
            onMouseLeave={handlePlanetLeave}
            onDoubleClick={() => handlePlanetSelect('games')}
          >
            <img 
              src="/assets/images/planets/game_planet.png" 
              alt="r/Games" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '0',
          width: '100%',
          textAlign: 'center',
          zIndex: '100'
        }}>
          <p style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px 20px',
            borderRadius: '10px',
            display: 'inline-block'
          }}>
            {isConfirmingPlanet ? 'Are you sure to select this planet?' : 'Select an interesting planet for your parrot to travel, double-click to choose 🌍'}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '50px',
            marginTop: '10px'
          }}>
            {isConfirmingPlanet ? (
              <>
                <button 
                  className="back-button" 
                  onClick={handleCancelPlanetConfirmation}
                >
                  Cancel
                </button>
                <button 
                  className="back-button" 
                  onClick={handlePlanetNext}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button 
                className="back-button" 
                onClick={handlePlanetSelectionBack}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Postcard view
  if (currentView === 'postcards') {
    // 使用实际的API数据替代mock数据
    const postData = {
      selectedParrotType: selectedParrot || 'cockatoo',
      userName: userName || 'Syrus',
      parrotName: parrotName || 'Rio',
      personality: selectedPersonality || 'crazy',
      redditTitle: "Boiled coffee in a pot contains high levels of the worst of cholesterol-elevating substances. Coffee from most coffee machines in workplaces also contains high levels of cholesterol-elevating substances. However, regular paper filter coffee makers filter out most of these substances, finds study.",
      redditLink: "https://www.reddit.com/r/science/comments/1jjfwlv/boiled_coffee_in_a_pot_contains_high_levels_of/",
      parrotComment: `Dear ${userName || 'Syrus'},\n\nYou won't believe it, but after this cup of coffee, I literally blasted off to the afterlife! My soul is now chilling on the filter paper! Cholesterol? Nah, my blood is now pure Colombian dark roast! Scientists say brewing coffee is bad for you? They've never seen me doing tap dance at 3 AM in a coffee shop! But don't worry, I've got the filter paper as my new headscarf now!\n\nLove u,\n${parrotName || 'Rio'}`
    };

    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <div className="postcard-container">
          <div className="postcard-content">
            {/* Left side - Video background of the selected parrot with scrollable content */}
            <div className="postcard-left-panel">
              <div className="video-container-wrapper">
                <VideoBackground 
                  src={`/videos/choose_${postData.selectedParrotType}.mp4`} 
                  loop={true}
                />
              </div>
            </div>
            
            {/* Right side - Postcard content with scrollable area */}
            <div className="postcard-right-panel">
              <div className="postcard-scrollable-content">
                {/* Reddit post title with parrot introduction */}
                <div className="postcard-title-container">
                  <p className="postcard-intro">Wow I saw this during my redicious travel:</p>
                  <h2 className="postcard-title">{postData.redditTitle}</h2>
                </div>
                
                {/* AI generated image */}
                <div className="postcard-image-container">
                  <img 
                    src="/assets/images/parrots/cockatoo_mock_postcard.png" 
                    alt="AI generated image based on Reddit post" 
                    className="postcard-image" 
                  />
                </div>
                
                {/* Parrot's comment based on personality */}
                <div className="postcard-comment-container">
                  <p className="postcard-comment">{postData.parrotComment}</p>
                </div>
                
                {/* Reddit link */}
                <div className="postcard-link-container">
                  <p className="postcard-link">
                    Reddit link: <a 
                      href={postData.redditLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {postData.redditLink}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button className="back-button" onClick={handleBackClick} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            Back
          </button>
        </div>
      </div>
    );
  }
  
  // Medals view
  if (currentView === 'medals') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src="/videos/rediciousbugparrots_medals.mp4" 
          loop={true}
        />
        
        <div className="content" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          paddingTop: '80px', // 向下移动，使内容在更下方的位置
          textAlign: 'center'
        }}>
          <p className="medals-text" style={{ 
            marginBottom: '20px', 
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)' 
          }}>
            Redicious bug friends and crazy medals! Try to collect them!
          </p>
          <button className="back-button" onClick={handleBackClick} style={{ display: 'block', margin: '0 auto' }}>
            Back
          </button>
        </div>
      </div>
    );
  }
  
  // Parrots with holy juice view
  if (currentView === 'fainted') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src={`/videos/choose_${selectedParrot || 'alexandrine'}.mp4`} 
          loop={true}
        />
        
        <div className="content" style={{ justifyContent: 'flex-end', paddingBottom: '80px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '10px 20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="fainted-text">Wanna save your friend's fainted parrot? Send it a holy juice! You'll get a postcard from it as a gift 🎁!</p>
            <button className="back-button" onClick={handleBackClick} style={{ display: 'block', margin: '0 auto' }}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Holy Juice view
  if (currentView === 'holyjuice') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src={faintedTimer ? "/videos/three_parrots_fainted.mp4" : "/videos/three_parrots_drinked.mp4"} 
          loop={true}
        />
        
        <div className="content" style={{ justifyContent: 'flex-end', paddingBottom: '80px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '10px 20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="holy-juice-info">
              <p>You have {holyJuice} holy juice now!</p>
            </div>
            <button className="back-button" onClick={handleBackClick} style={{ display: 'block', margin: '0 auto' }}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Personality selection step
  if (gameStep === 'second') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src={`/videos/choose_${selectedParrot}.mp4`} 
          loop={true}
        />
        
        <div className="content" style={{ 
          justifyContent: 'flex-end', 
          paddingBottom: '100px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h2 className="selected-parrot-title" style={{ 
            backgroundColor: 'transparent',
            marginBottom: '30px'
          }}>
            You selected: {selectedParrot}
          </h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button className="back-button" onClick={() => setGameStep('selection')}>
              Back
            </button>
            <button className="back-button" onClick={() => setGameStep('naming_parrot')}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Stage 1: Select parrot
  if (gameStep === 'selection') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src="/videos/three_parrots_startscreen.mp4" 
          loop={true}
        />
        
        <div className="content">
          {/* Main title, fades out after 5 seconds */}
          {showTitle && (
            <h1 className="main-title" style={{
              fontSize: '4rem',
              textShadow: '3px 3px 5px rgba(0, 0, 0, 0.7)',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              letterSpacing: '2px',
              fontWeight: 'bold'
            }}>
              PARROT REDICIOUS TRAVEL
            </h1>
          )}
          
          {/* Subtitle prompt, shown after title fades */}
          {showSubtitle && (
            <div className="subtitle-container">
              <p className="selection-text">
                Select your favourite parrot, just click it!
              </p>
            </div>
          )}
          
          {/* Invisible click areas */}
          {showSubtitle && (
            <div className="clickable-areas">
              <div 
                className="clickable-area left" 
                onClick={() => handleParrotSelect('alexandrine')}
                title="Alexandrine"
              ></div>
              <div 
                className="clickable-area center" 
                onClick={() => handleParrotSelect('cockatoo')}
                title="Cockatoo"
              ></div>
              <div 
                className="clickable-area right" 
                onClick={() => handleParrotSelect('caique')}
                title="Caique"
              ></div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Parrot naming step
  if (gameStep === 'naming_parrot') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src={`/videos/choose_${selectedParrot}.mp4`} 
          loop={true}
        />
        
        <div className="content" style={{ 
          justifyContent: 'flex-end', 
          paddingBottom: '150px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h2 className="selected-parrot-title" style={{ backgroundColor: 'transparent', marginBottom: '30px' }}>
            Give your parrot a name?
          </h2>
          <div className="name-input-container">
            <button 
              className="back-button" 
              onClick={handleParrotNamingBack}
            >
              Back
            </button>
            <input
              ref={parrotNameInputRef}
              type="text"
              className="name-input"
              value={parrotName}
              onChange={(e) => setParrotName(e.target.value)}
              maxLength={20}
              placeholder="Enter parrot name"
            />
            <button 
              className="back-button" 
              onClick={handleParrotNameNext}
              disabled={!parrotName.trim() || parrotName.length > 20}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // User naming step
  if (gameStep === 'naming_user') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src={`/videos/choose_${selectedParrot}.mp4`} 
          loop={true}
        />
        
        <div className="content" style={{ 
          justifyContent: 'flex-end', 
          paddingBottom: '150px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h2 className="selected-parrot-title" style={{ backgroundColor: 'transparent', marginBottom: '30px' }}>
            Hey, what's your name?
          </h2>
          <div className="name-input-container">
            <button 
              className="back-button" 
              onClick={handleUserNamingBack}
            >
              Back
            </button>
            <input
              ref={userNameInputRef}
              type="text"
              className="name-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={20}
              placeholder="Enter your name"
            />
            <button 
              className="back-button" 
              onClick={handleUserNameNext}
              disabled={!userName.trim() || userName.length > 20}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Personality selection step
  if (gameStep === 'personality') {
    return (
      <div className="game-container white-background">
        {renderNavIcons()}
        
        <VideoBackground 
          src={`/videos/choose_${selectedParrot}.mp4`} 
          loop={true}
        />
        
        <div className="content" style={{ 
          justifyContent: 'flex-start', 
          paddingTop: '80px',
          alignItems: 'flex-end',
          paddingRight: '50px',
          textAlign: 'left',
          width: '100%'
        }}>
          <div className="personality-container">
            <div style={{ height: '100px' }}></div>
            <h3 style={{ 
              backgroundColor: 'transparent', 
              marginBottom: '30px',
              color: 'black',
              fontSize: '1.6rem',
              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
              textAlign: 'left',
              width: '100%'
            }}>
              Select your parrot's personality:
            </h3>
            
            <div className="personality-grid">
              <button 
                className={`back-button ${selectedPersonality === 'nerd' ? 'selected-personality' : ''}`}
                onClick={() => handlePersonalitySelect('nerd')}
              >
                nerd🤓
              </button>
              <button 
                className={`back-button ${selectedPersonality === 'romantic' ? 'selected-personality' : ''}`}
                onClick={() => handlePersonalitySelect('romantic')}
              >
                romantic🌹
              </button>
              <button 
                className={`back-button ${selectedPersonality === 'emo' ? 'selected-personality' : ''}`}
                onClick={() => handlePersonalitySelect('emo')}
              >
                emo😢
              </button>
              <button 
                className={`back-button ${selectedPersonality === 'crazy' ? 'selected-personality' : ''}`}
                onClick={() => handlePersonalitySelect('crazy')}
              >
                crazy💃
              </button>
              <button 
                className={`back-button ${selectedPersonality === 'free-associative' ? 'selected-personality' : ''}`}
                onClick={() => handlePersonalitySelect('free-associative')}
              >
                free-associative🤔
              </button>
              <button 
                className={`back-button ${selectedPersonality === 'chatterbox' ? 'selected-personality' : ''}`}
                onClick={() => handlePersonalitySelect('chatterbox')}
              >
                chatterbox💬
              </button>
            </div>
            
            <div className="navigation-buttons" style={{ marginTop: '20px' }}>
              <button 
                className="back-button" 
                onClick={handlePersonalityBack}
              >
                Back
              </button>
              <button 
                className="back-button" 
                onClick={handlePersonalityNext}
                disabled={!selectedPersonality}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Stage 2: Show selected parrot video
  return (
    <div className="game-container white-background">
      {renderNavIcons()}
      
      <VideoBackground 
        src={`/videos/choose_${selectedParrot}.mp4`} 
        loop={true}
      />
      
      <div className="content" style={{ 
        justifyContent: 'flex-end', 
        paddingBottom: '100px',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 className="selected-parrot-title" style={{ 
          backgroundColor: 'transparent',
          marginBottom: '30px'
        }}>
          You selected: {selectedParrot}
        </h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="back-button" onClick={() => setGameStep('selection')}>
            Back
          </button>
          <button className="back-button" onClick={() => setGameStep('naming_parrot')}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;