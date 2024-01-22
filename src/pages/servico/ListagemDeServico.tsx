import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, debounce } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { IListagemServico, ServicoService } from '../../shared/services/api/servico/ServicoService'
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { useDebounce } from "../../shared/hooks/UseDebounce";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Environment } from "../../shared/environment";

export const ListagemDeServico: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  //const { id = 'novo' } = useParams<'id'>();
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<IListagemServico[]>([]);

  const { debounce } = useDebounce(600, false);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const handleDelete = (id: number) => {
    console.log('Save');
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ServicoService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert("Nenhum registro encontrado!");
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
      titulo='Listagem de Serviços'
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo='Novo'
          aoClicarEmNovo={() => navigate('/servico/detalhe/novo')}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ação</TableCell>

              <TableCell>Serviço</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Tempo Serviço</TableCell>
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
                  <IconButton size="small" onClick={() => navigate(`/servico/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeServico}</TableCell>
                <TableCell>{row.descricaoServico}</TableCell>
                <TableCell>{row.tempoServico}</TableCell>
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
  )
}