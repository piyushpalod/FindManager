import React, { useState, useRef, useEffect, useReducer } from "react";
import "./styles.css";
import useKeyPress from "./useKeyPress";

export default function Dropdown ({options, id, label, prompt, value, onChange}) {

    function reducer(state, action) {
        switch (action.type) {
          case "arrowUp":
            return {
              selectedIndex:
                state.selectedIndex !== 0 ? state.selectedIndex - 1 : options.length - 1
            };
          case "arrowDown":
            return {
              selectedIndex:
                state.selectedIndex !== options.length - 1 ? state.selectedIndex + 1 : 0
            };
          case "select":
            return { selectedIndex: action.payload };
          default:
            throw new Error();
        }
      }

    const initialState = { selectedIndex: 0 };
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef(null);
    const arrowUpPressed = useKeyPress("ArrowUp");
    const arrowDownPressed = useKeyPress("ArrowDown");
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (arrowUpPressed) {
          dispatch({ type: "arrowUp" });
        }
      }, [arrowUpPressed]);
    
      useEffect(() => {
        if (arrowDownPressed) {
          dispatch({ type: "arrowDown" });
        }
      }, [arrowDownPressed]);

    useEffect(() => {
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close); 
    }, [])

    function filter(options){
        return options.filter( option=> option[label].toLowerCase().indexOf(query.toLocaleLowerCase()) > -1)
    }

    function close(e){
        setOpen(e && e.target === ref.current)
    }

    function displayValue() {
        if(query.length > 0)
        return query;
        if(value) return value[label]
        return ""
    }

    return <div className="dropdown"> 
        <div className="control" onClick={ () => setOpen((prev) => !prev) }
            tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                    setOpen((prev) => !prev);
                    e.target.blur();
                    }
                }}>
            <div className="selected-value">
                <input type="text" ref={ref} 
                placeholder={ value ? value[label] : prompt }
                value= {displayValue()}
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                    setQuery("")
                    setQuery(e.target.value)
                    onChange(null)
                    e.target.blur();
                    }
                }}
                onChange={e => {
                    setQuery(e.target.value)
                    onChange(null)
                }}
                onClick={() => setOpen(prev => !prev)}/>
                </div>
            <div className={ `arrow ${ open ? "open" : null}`}></div>
        </div>
        <div className={ `options ${ open ? "open" : null}`}>
            {
                filter(options).map((option, i) => <div 
                key={option[id]}    
                className={ `option ${ value === option ? "selected" : null}`}
                aria-pressed={i === state.selectedIndex}
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                    setQuery("")
                    onChange(option)
                    setOpen(false)
                    e.target.blur();
                    }
                }}
                onClick={ () => {
                    setQuery("")
                    onChange(option)
                    setOpen(false)
                }}
                > {option[label]} </div>)
            }
        </div>
    </div>
}
