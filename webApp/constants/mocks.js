const categories = [
    {
      id: "plants",
      name: "Plants",
      tags: ["products", "inspirations"],
      count: 147,
    },
    {
      id: "seeds",
      name: "Seeds",
      tags: ["products", "shop"],
      count: 16,
    },
    {
      id: "flowers",
      name: "Flowers",
      tags: ["products", "inspirations"],
      count: 68,
    },
    {
      id: "sprayers",
      name: "Sprayers",
      tags: ["products", "shop"],
      count: 17,
    },
    {
      id: "pots",
      name: "Pots",
      tags: ["products", "shop"],
      count: 47,
    },
    {
      id: "fertilizers",
      name: "fertilizers",
      tags: ["products", "shop"],
      count: 47,
    }
  ];
  
  const products = [
    {
      id: 1,
      name: "16 Best Plants That Thrive In Your Bedroom",
      description:
        "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
      tags: ["Interior", "27 m²", "Ideas"],
      
    }
  ];
  
  const explore = [
    require("../asset/images/chair.png"),
    require("../asset/images/chair.png"),
    require("../asset/images/chair.png"),
    require("../asset/images/chair.png"),
    require("../asset/images/chair.png"),
    require("../asset/images/chair.png")
  ];
  
  
  const profile = {
    username: "react-ui-kit",
    location: "Europe",
    email: "contact@gmail.com",
    avatar: require("../asset/images/prifile.png"),
    budget: 1000,
    monthly_cap: 5000,
    notifications: true,
    newsletter: false
  };
  
  export { categories, products, profile , explore};