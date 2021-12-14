import { useEffect } from 'react';

// KeyEvent Handler Effect
export const useKeyNavigation = (matches, selectedItemIndex, setSelectedItemIndex, setSelectedItem) => {
    useEffect(() => {
      if (matches && matches.length > 0) {
        let matchCount = matches.length;
        
        const handleKeyEvent = (e) => {
          // 38: Up Arrow Key 
          if (e.keyCode === 38 || e.which === 38) {
            if (selectedItemIndex > 1 && selectedItemIndex <= matchCount) {
              setSelectedItemIndex(selectedItemIndex);
              setSelectedItem(matches[selectedItemIndex - 2]);
              setSelectedItemIndex(c => c - 1);
            } else {
              setSelectedItemIndex(matchCount);
              setSelectedItem(matches[matchCount-1]);
            }
          }
          // 40: DownArrow KEY
          if (e.keyCode === 40 || e.which === 40) {
            if (selectedItemIndex < matchCount) {
              setSelectedItemIndex(selectedItemIndex);
              setSelectedItem(matches[selectedItemIndex]);
            } else {
              setSelectedItemIndex(0);
              setSelectedItem(matches[0]);
            }
            setSelectedItemIndex(c => c+1);
          }
          // ENTER KEY
          if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            // pending selectedItemIndex update from arrows causes it to add 1 extra when Enter is pressed.
            // The following is required to allow it to select the correctly highlighted option.
            let selectedIndex = selectedItemIndex - 1;
            if (selectedIndex === -1) selectedIndex = 0;
            setSelectedItem(matches[selectedIndex]);
          }
        };
        
        window.addEventListener("keydown", handleKeyEvent);
        return () => window.removeEventListener("keydown", handleKeyEvent);
      }
    }, [
      matches, selectedItemIndex, setSelectedItemIndex, setSelectedItem
    ]);
  }

// find matches inside response using searchString
// Used by SearchBox component
export const getMatches = (response, searchString) => {
    return response.filter(
      (x) =>
        x.search(new RegExp(searchString, "i")) > -1
    );
}

// find searchstring and highlight selected part
export const getHighlightParts = (searchString, word) => {
    const escapeRegExp = (str = "") =>
    str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    const regex = new RegExp(`(${escapeRegExp(searchString)})`, "gi");
    const strParts = word.split(regex);
    return strParts.map((strPart, i) =>
      regex.test(strPart) ? (
        <mark key={i}>{strPart}</mark>
      ) : (
        <span key={i}>{strPart}</span>
    ));
}