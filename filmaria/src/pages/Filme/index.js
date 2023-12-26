import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import api from '../../services/api'
import './filme.css'

function Filme() {

    const { id } = useParams()
    const navigate = useNavigate();

    const [filme, setFilmes] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            return await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'f9adf22fb6db92f336a19d18f2e0874d',
                    language: 'pt-BR'
                }
            }).then((response) => {
                setFilmes(response.data)
                setLoading(false)
            }).catch(() => {
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme()

        return () => {

        }
    }, [navigate, id])

    function salvarFilmes() {
        const minhaLista = localStorage.getItem("@primeflix")
        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmeSalvo) => {
            return filmeSalvo.id === filme.id
        })

        if (hasFilme) {
            toast.error("Este filme já está na sua lista!")
            return
        } else {
            filmesSalvos.push(filme)
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
            toast.success("Filme salvo com sucesso!")
        }
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <p>{filme.overview}</p>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilmes}>Salvar</button>
                <button><a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme;