import React, {useEffect, useState} from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import CardBody from "reactstrap/es/CardBody";
import Card from "reactstrap/es/Card";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserSearchResults} from "../../store/acrions/Search/actionCreators";
import SearchItem from "./SearchItem";

const Search = () => {
    const dispatch = useDispatch()
    let results = useSelector(state => state.search.searchResults)
    const [search, setSearch] = useState(null)
    useEffect(() => {
        dispatch(fetchUserSearchResults(search))
    }, [search])

    const search_on_change = (e) => {
        setSearch(e.target.value)
    }
    return (

        <div className="content">
            <Card>
                <CardBody>
                    <SearchForm onChangeHandler={search_on_change}/>
                </CardBody>
            </Card>

            {results && <Card>
                <CardBody>
                    {search === null && <h2>Издеп баштыңыз</h2>}
                    {search !== null && results.length === 0 && <h2>Адам табылган жок</h2>}
                    {results?.map((user, index) => {
                        return (
                            <SearchItem user={user}/>
                        )
                    })}
                </CardBody>
            </Card>}
        </div>
    )
}

export default Search