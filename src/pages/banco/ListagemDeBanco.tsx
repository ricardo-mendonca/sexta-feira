import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"


export const ListagemDeBanco: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    return (
        <LayoutBaseDePagina
            titulo='Listagem de Bancos'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo='Nova'
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}


                />
            }
        >
            Conteudo da Tela
        </LayoutBaseDePagina>
    )
}