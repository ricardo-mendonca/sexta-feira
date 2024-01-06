import { useEffect, useMemo, useState } from "react";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom"

import { BancoService, IListagemBanco } from "../../shared/services/api/banco/BancoService";
import { FerramentasDaListagem } from "../../shared/components"
import { useDebounce } from "../../shared/hooks/UseDebounce";
import { LayoutBaseDePagina } from "../../shared/layouts"
import { Environment } from "../../shared/environment";

export const ListagemDeBanco: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(true);

    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IListagemBanco[]>([]);

    const { debounce } = useDebounce(600, false);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            BancoService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setRows(result.data);

                        setTotalCount(result.totalCount);
                    }
                });
        });

    }, [busca, pagina]);


    return (
        <LayoutBaseDePagina
            titulo='Listagem de Bancos'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo='Novo'
                    aoClicarEmNovo={()=> navigate('/bancos/detalhe/novo')}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}


                />
            }
        >

            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ação</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Ativo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><IconButton size="small" >
                                    <Icon>delete</Icon>
                                </IconButton>
                                    <IconButton size="small"  onClick={() => navigate(`/bancos/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton></TableCell>
                                <TableCell>{row.descricao}</TableCell>
                                <TableCell>{row.ativo === "1" ? "Sim" : "Não"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>

                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>

                </Table>
            </TableContainer>



        </LayoutBaseDePagina>
    )
}