const Filter = ({searchBar, handleSearchBar}) => {
  return(
    <div>
        <label>filter</label>
        <input type="text" 
          value={searchBar}
          onChange={handleSearchBar}
        />
    </div>
  )
}
export default Filter;