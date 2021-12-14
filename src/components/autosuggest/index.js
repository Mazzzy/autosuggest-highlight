import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks';
import { useKeyNavigation, getMatches, getHighlightParts } from '../../utils';
import InfoBox from '../infobox';
import './autosuggest.css';

const SearchBox = (props) => {
    const textInputCount = 3;
    const [searchString, setSearchString] = useState('');
    const [fetchData, setFetchData] = useState(false); // bool: true = fetchData using useFetch()
    const [dataSet, setDataSet] = useState([]); // load response into state
    const [matches, setMatches] = useState([]); // load matches into state
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { response, loading } = useFetch(fetchData);
    
    // onChange for input field
    const handleChange = (e) => {
      setSearchString(e.target.value);
      if (e.target.value.length >= textInputCount) {
        setFetchData(true);
      }
      else {
        setSelectedItemIndex(0); // reset to preserve keyboard navigation
        setMatches([]); // reset 'matches' array
        console.log('matches array reset')
      }
    }
    
    // Load dataSet from fetch
    useEffect(() => {
      if (!loading) {
        setDataSet(response);
        console.log('Data loaded successfully');
      }
    }, [loading, response, setDataSet]);
    
    // Load "matches" array
    useEffect(() => {
      if (dataSet && searchString.length >= textInputCount) {
        setMatches(getMatches(dataSet, searchString));
        console.log('Matches updated')
      }
    }, [dataSet, searchString, setMatches, getMatches]);
    
    useKeyNavigation(matches, selectedItemIndex, setSelectedItemIndex, setSelectedItem);
    
    // Display "matches" array
    const displayMatches = () => {
      // double check matches is valid for map()
      return (matches && matches.length > 0 ?
      matches.map((matchItem, i) => (
        <li key={i} className={selectedItemIndex-1 === i ? 'highlight':''} onClick={() => {
            setSelectedItem(matchItem);
            setSelectedItemIndex(i);
        }}>
          {getHighlightParts(searchString, matchItem)}
        </li>
      )) : ''); 
    }
      
    
    return (
      <div className="autosuggest-container">
        <input type="text"  name={props.name}  value={searchString} className="txt-search"
          autoComplete="off" placeholder="Type text" onChange={handleChange} />
        
        { !loading &&
        <ul className="search-results">
          {displayMatches()}
        </ul>
        }
        <div className="infobox-container">
            <InfoBox title="searchString" content={searchString} />
            { selectedItem.length > 0 &&
            <InfoBox title="selectedItem" content={selectedItem} /> }
            <InfoBox title="dataSet" content={ dataSet.length > 0 ? `Total records: ${dataSet.length}` : 'not loaded' } />
            <InfoBox title="matches" content={ matches.length > 0 ? `Total matched: ${matches.length}` : 'no matches' } />
        </div>
      </div>
    )
};

export default SearchBox;