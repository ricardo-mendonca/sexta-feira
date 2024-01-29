import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { ClienteService, IListagemCliente } from "../../shared/services/api/cliente/ClienteService";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Icon, TableFooter, Pagination, LinearProgress } from "@mui/material";
import { Environment } from "../../shared/environment";


export const ListagemDeCliente: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<IListagemCliente[]>([]);

  const { debounce } = useDebounce(600, false);

  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = (id: number) => {
    console.log('delete');
  };
  
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ClienteService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert("Nenhum registro encontrado!");
          } else {

            
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  }, [busca, pagina]);

  return (

    <LayoutBaseDePagina
      titulo='Listagem de Clientes'
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo='Novo'
          aoClicarEmNovo={() => navigate('/cliente/detalhe/novo')}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >

<TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ação</TableCell>

              <TableCell>Nome</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Ativo</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/cliente/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.celular}</TableCell>
                <TableCell>{row.ativo === "1" ? "Sim" : "Não"}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={6}>
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
                <TableCell colSpan={6}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>

        </Table>
      </TableContainer>


    </LayoutBaseDePagina>
  );
}