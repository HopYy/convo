import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";

import Input from "components/common/Input";
import Error from "components/common/Error";
import { searchFriendsAction } from "redux store/actions/friendsActions";
import { CLEAR_SEARCH_FRIENDS } from "redux store/constants/friendsConstants";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const searchFriends = useSelector((state) => state.friends.searchFriends);
  const dispatch = useDispatch();
  const location = useLocation();

  const debouncedSearch = useCallback(
    debounce((value) => {
      setIsSearching(true);
      dispatch(searchFriendsAction(value)).finally(() => {
        setIsSearching(false);
        setSearchCompleted(true);
      });
    }, 800),
    [dispatch]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchCompleted(false);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setInputValue("");
    setIsSearching(false);
    setSearchCompleted(false);
  };

  useEffect(() => {
    return () => {
      clearSearch();
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    clearSearch();
    dispatch({
      type: CLEAR_SEARCH_FRIENDS,
    });
  }, [location, dispatch]);

  return (
    <>
      <Input
        onChange={handleChange}
        placeholder="Search friends by username"
        value={inputValue}
      />
      {!isSearching &&
        searchCompleted &&
        inputValue !== "" &&
        !searchFriends && <Error errorMessage="No results found" />}
    </>
  );
};

export default Search;
