"use client"
import React, { FormEvent, useState } from 'react'

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // prevents the default reload that usually happens when a form is submitted

    const isValidUrl = isValidAmazonUrl(searchPrompt);

    if(!isValidUrl) alert('Invalid Link.');

    try {
      setIsLoading(true);

      // Scrape the product page
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form 
        className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
    >
        <input type='text' value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)}  placeholder='Enter product link' className='searchbar-input'/>

        <button type='submit' className='searchbar-btn' disabled={searchPrompt === ''}>
            {isLoading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar