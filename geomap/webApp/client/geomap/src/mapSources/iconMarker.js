// getIconByCategory.js
import L from 'leaflet';
import calcium from '../mapSources/Icons/calcium.png';
import defaultIcon from '../mapSources/Icons/ore.png';
import ore from '../mapSources/Icons/ore.png';
// ... import other icons

const iconByCategory = {
  'Calcium': calcium,
  'Zinc': defaultIcon,
  'Iron': ore,
  // ... other categories
};

export const getIcon = (category) => {
    const iconUrl = iconByCategory[category] || defaultIcon;
    console.log(iconUrl); // This should log the path of the icon
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [25, 25],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };
  
