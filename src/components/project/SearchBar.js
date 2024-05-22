import React from 'react'

const SearchBar = () => {
    
  return (
    <form class="search-box" className="search-box">
        <input class="search-txt" className="search-txt" type="text" placeholder="검색어를 입력하세요"/>
            <button class="search-btn" className="search-btn" type="submit">
                <i class="fa-solid fa-magnifying-glass" className="fa-solid fa-magnifying-glass"></i>
            </button>
    </form>
    
  )
}


export default SearchBar