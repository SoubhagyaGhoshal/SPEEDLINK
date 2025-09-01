export const navItems = [
  {
    id: 'home',
    title: 'Home',
    path: '/',
    type: 'link',
    exact: true
  },
  {
    id: 'services',
    title: 'Our Services',
    type: 'dropdown',
    items: [
      { 
        title: "Cable TV", 
        path: "/services/cable-tv",
        description: "Digital and HD cable TV services"
      },
      { 
        title: "Broadband", 
        path: "/services/broadband",
        description: "High-speed internet connections"
      },
      { 
        title: "Bundle Deals", 
        path: "/services/bundles",
        description: "Save with our combo packages"
      },
      { 
        title: "Business Solutions", 
        path: "/business/solutions",
        description: "Enterprise-grade connectivity"
      }
    ]
  },
  {
    id: 'cable-tv',
    title: 'Cable TV',
    type: 'dropdown',
    items: [
      { 
        title: "Digital Cable", 
        path: "/cable-tv/digital",
        features: ["200+ HD channels", "4K content available"]
      },
      { 
        title: "Channel Packages", 
        path: "/cable-tv/packages",
        features: ["Sports", "Movies", "News", "Kids"]
      },
      { 
        title: "Set Top Boxes", 
        path: "/cable-tv/equipment",
        features: ["4K UHD Box", "HD DVR", "Standard Box"]
      },
      { 
        title: "Premium Channels", 
        path: "/cable-tv/premium",
        features: ["HBO", "Showtime", "Sports Network"]
      }
    ]
  },
  {
    id: 'broadband',
    title: 'Broadband',
    type: 'dropdown',
    items: [
      { 
        title: "Internet Plans", 
        path: "/broadband/plans",
        speed: "Up to 1 Gbps"
      },
      { 
        title: "Coverage Check", 
        path: "/broadband/coverage",
        description: "Check availability in your area"
      },
      { 
        title: "Speed Test", 
        path: "/broadband/speed-test",
        description: "Test your current connection"
      },
      { 
        title: "WiFi Solutions", 
        path: "/broadband/wifi",
        description: "Whole home WiFi systems"
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    type: 'dropdown',
    items: [
      { 
        title: "Help Center", 
        path: "/help",
        icon: "support"
      },
      { 
        title: "Contact Us", 
        path: "/contact",
        methods: ["Phone", "Live Chat", "Email"]
      },
      { 
        title: "My Account", 
        path: "/account",
        requiresAuth: true
      },
      { 
        title: "Track Service Request", 
        path: "/support/track",
        description: "Check your service status"
      }
    ]
  },
  {
    id: 'about',
    title: 'About Us',
    path: '/about',
    type: 'link'
  }
];
