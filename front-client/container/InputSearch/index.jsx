import { PColor } from "public/colors";
import { IconCancel, IconSearch, IconShopping } from "public/icons";
import { useEffect, useReducer, useState, useRef } from "react";
import { useRouter } from 'next/router'
import { Button, ContentInputSearch, Input, SearchTarget } from "./styled";

export const InputSearch = () => {
    const location = useRouter()
    const [values, setValues] = useState({})
    const [onkUp, setOnKeyUp] = useState(false)
    const ref = useRef()
    useEffect(() => {
        if (location.pathname === '/buscar/[search]') {
            setOnKeyUp(true)
        } else {
            setOnKeyUp(false)
        }
    }, [])
    const initialState = {
        searchHistory: [],
    };
    function favoriteReducer(state, action) {
        switch (action.type) {
            case "ADD_TO_FAVORITE":
                return {
                    ...state,
                    searchHistory: [...state.searchHistory, action.payload],
                };

            case "REMOVE_FROM_FAVORITE":
                return {
                    ...state,
                    searchHistory: [
                        ...state.searchHistory.filter((favorite) => favorite !== action.payload),
                    ],
                };

            default:
                return state;
        }
    };
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleFavorite = (favorite) => {
        dispatch({
            type: !!isCharacter(favorite)
                ? "REMOVE_FROM_FAVORITE"
                : "ADD_TO_FAVORITE",
            payload: favorite,
        });
    };
    const [search, setTodos] = useState([]);
    useEffect(() => {
        const localTodos = localStorage.getItem("search");
        if (localTodos) {
            setTodos(JSON.parse(localTodos));
        }
    }, [setTodos]);
    const addTodos = todo => {
        if (search.length >= 4) {
            search.pop()
            setTodos([...search, todo]);
            search.unshift(todo)
        } else {
            setTodos([...search, todo]);
        }
    };
    const markComplete = item => setTodos(search.filter((_, i) => i !== item))
    useEffect(() => {
        localStorage.setItem("search", JSON.stringify(search));
    }, [search]);
    const isCharacter = (favorite) => searchHistory.searchHistory.find((character) => character === favorite);
    const handleSearch = (elem, type, selected) => {
        const isCharacter = () => search.find((character) => character === values.search);
        const exi = isCharacter()
        ref.current.focus()
        if (elem) return location.push(`/buscar/${elem}/${type}`)
        if (!values.search || values.search === ' ') return;
        if (!exi) {
            addTodos(values.search)
        }
        if (selected) {
            location.push(`/buscar/${values.search}/${type}`)
        }

    }
    // INITIAL REDUCER
    const initializer = (initialValue = initialState) => JSON.parse(localStorage.getItem("localCart")) || initialValue
    const [searchHistory, dispatch] = useReducer(favoriteReducer, initialState);

    useEffect(() => {
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory.searchHistory));
    }, [searchHistory]);


    return (<ContentInputSearch>
        <button className="btn btn-primary" onClick={() => handleSearch(null, 'TODO', true)}>
            <IconSearch size='20px' color={PColor} />
        </button>
        <Input ref={ref} type="text" aria-label="Busca por platillo o restaurante" role="search" tabIndex={'0'} autoComplete="off" placeholder='Buscar platillo o restaurante' onChange={(e) => handleChange(e)} value={values.search} name='search'
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(null, 'TODO', true)
                    e.target.blur()
                }
            }}
        />
        {/* https://codesandbox.io/s/persist-localstorage-with-usereducer-forked-j5wbgi */}
        <SearchTarget values={values?.search?.length}>
            {values?.search?.length ?
                <div>
                    <button onClick={() => handleSearch(null, 'PLATOS', true)}>
                        <IconShopping size='25px' color={PColor} />
                        <span>{values.search} Platos</span>
                    </button>
                    <button onClick={() => handleSearch(null, 'RESTAURANT', true)}>
                        <IconShopping size='25px' color={PColor} />
                        <span>{values.search} Restaurantes</span>
                    </button>
                    <button onClick={() => handleSearch(null, 'TODO', true)}>
                        <IconSearch size='25px' color={PColor} />
                        <span>{values.search} todo en Delivery</span>
                    </button>
                </div>
                : search.length >= 1 ? 
                <>
                    {<div className='recent'>
                        <span className='recent-span'>Búsquedas recientes</span>
                        {search?.map((todo, i) => (
                            <div className='item-recent' key={i}>
                                <span className='recent-span' key={i + 1} onClick={() => handleSearch(todo, 'TODO')}>{todo}</span>
                                <Button onClick={() => markComplete(i)}><IconCancel size="15px" /></Button>
                            </div>
                        ))}
                    </div>}
                </>
            : null}
        </SearchTarget>
    </ContentInputSearch>);
};
