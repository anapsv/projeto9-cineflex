import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Movies() {
    const [moviesArr, setMoviesArr] = useState([]);
    useEffect(() => {
        const promise = axios.get(
            "https://mock-api.driven.com.br/api/v5/cineflex/movies"
        );
        promise.then((response) => {
            setMoviesArr([...response.data]);
        });
    }, []);

    return (
        <Homepage>
            <span>Selecione o filme</span>
            <MovieList>
                {moviesArr.map((obj, index) => {
                    return (
                        <Link key={index} id={obj.id} to={`/filme/${obj.id}`}>
                            <img src={obj.posterURL} alt="filme" />
                        </Link>
                    );
                })}
            </MovieList>
        </Homepage>
    );
}

const Homepage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    margin: 40px;
    font-size: 24px;
    font-weight: 400;
  }
`;
const MovieList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 30px;
  row-gap: 11px;
  max-width: 612px;

  img {
    height: 193px;
    border-width: 8px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  }
`;