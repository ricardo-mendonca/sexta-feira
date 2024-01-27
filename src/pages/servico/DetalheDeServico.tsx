import { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ServicoService } from "../../shared/services/api/servico/ServicoService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Box, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Paper, Select, Switch, Typography } from "@mui/material";


interface IFormData {
    nomeServico: string;
    descricaoServico: string;
    tempoHoraServico: number;
    precoServico: number;
    ativo: string;
    id: number;
}

export const DetalheDeServico: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const { id = 'novo' } = useParams<'id'>();
    const [nomeServico, setNomeServico] = useState("");
    const [descricaoServico, setDescricaoServico] = useState("");
    const [precoServico, setPrecoServico] = useState("");
 
    const [ativo, setAtivo] = useState(true);
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAtivo(event.target.checked);
    };

    const [tempoHoraServico, setTempoHoraServico] = useState("");
    const handleChangeTempo = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTempoHoraServico(event.target.value);
    }

    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);

            ServicoService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(" OPS!! algo deu errado \n" + result.message);
                        navigate("/servico");
                    }
                    else {
                        setNomeServico(result.nomeServico);
                        setDescricaoServico(result.descricaoServico);
                        setTempoHoraServico(result.tempoHoraServico.toString());
                        setPrecoServico(result.precoServico.toString());
                        setAtivo(result.ativo == '1' ? true : false);
                        formRef.current?.setData(result);
                    }
                });
        }
        else {
            setIsLoading(false);
            formRef.current?.setData({
                nomeServico: '',
                descricaoServico: '',
                tempoServico: '0',
                tempoHoraServico: setTempoHoraServico('0'),
                precoServico: '',
                ativo: ''
            })
        }
    }, [formRef, id, navigate]);


    const handleSave = (dados: IFormData) => {

        //#region VALIDAÇÃO DE CAMPO
        var validacao = 0;
        if (dados.nomeServico.length < 2) {
            formRef.current?.setFieldError('nomeServico', 'O campo serviço é obrigatorio, minimo de 3 caracteres!');
            setIsLoading(false);
            validacao = 1;
        }
        if (dados.descricaoServico.length < 2) {
            formRef.current?.setFieldError('descricaoServico', 'O campo Descricao de serviço é obrigatorio!');
            setIsLoading(false);
            validacao = 1;
        }

        if ((dados.precoServico.toString()) == "") {
            formRef.current?.setFieldError('precoServico', 'O campo Preço é obrigatorio!');
            setIsLoading(false);
            validacao = 1;
        }

        if (validacao != 0) {
            return;
        }
        //#endregion

        dados.ativo = (ativo === true ? '1' : '0');
        dados.tempoHoraServico = (Number(tempoHoraServico));

        if (id === "novo") {
            ServicoService.create(dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert("Ops!! algo deu ruim! \n" + result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/servico');
                    } else {
                        navigate(`/servico/detalhe/${result}`);
                    }
                }
            });
        }
        else {
            setIsLoading(true);

            dados.id = Number(id);
            ServicoService.updateById(Number(id), dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert("Ops!! algo deu ruim! \n" + result.message);
                } else {
                    if (isSaveAndClose()) {
                        navigate('/servico');
                    }
                }
            });
        }
    };

    const handleDelete = (id: number) => {
        if (
            window.confirm(
                "você tem certeza que quer apagar o registro " + id + " ?"
            )
        ) {
            ServicoService.deleteById(id).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert("Registro apagado com sucesso!");
                    navigate("/servico");
                }
            });
        }



    };


    return (

        <LayoutBaseDePagina
            titulo="Detalhe de Servico"
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Novo"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'novo'}
                    mostrarBotaoApagar={id !== 'novo'}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmVoltar={() => navigate('/servico')}
                    aoClicarEmNovo={() => navigate('/servico/detalhe/novo')}
                />
            }
        >

            <VForm ref={formRef} onSubmit={handleSave}>
                <Box
                    margin={1}
                    display="flex"
                    flexDirection="column"
                    component={Paper}
                    variant="outlined"
                >
                    <Grid container direction="column" padding={2} spacing={2}>
                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>

                            <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    name="nomeServico"
                                    disabled={isLoading}
                                    label="Serviço"
                                    onChange={e => setNomeServico(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <label>Conta Ativa ? </label>
                                <Switch
                                    checked={ativo}
                                    onChange={handleChangeSwitch}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>

                        </Grid>
                        <Grid container item direction="row" spacing={2}>

                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                <VTextField
                                    fullWidth
                                    name="descricaoServico"
                                    disabled={isLoading}
                                    label="Descrição do serviço"
                                    onChange={e => setDescricaoServico(e.target.value)}
                                />
                            </Grid>



                        </Grid>
                        <Grid container item direction="row" spacing={2}>



                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <VTextField
                                    fullWidth
                                    type="number"
                                    name="precoServico"
                                    disabled={isLoading}
                                    label="Valor do serviço"
                                    onChange={e => setPrecoServico(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tempo Serviço</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tempoHoraServico}
                                        label="Tempo Serviço"
                                        onChange={handleChangeTempo}
                                    >
                                        <MenuItem value="0">não selecionado</MenuItem>
                                        <MenuItem value={30}>30min</MenuItem>
                                        <MenuItem value={40}>40min</MenuItem>
                                        <MenuItem value={50}>50min</MenuItem>
                                        <MenuItem value={60}>1 hora</MenuItem>
                                        <MenuItem value={70}>1h 10min</MenuItem>
                                        <MenuItem value={80}>1h 20min</MenuItem>
                                        <MenuItem value={90}>1h 30min</MenuItem>
                                        <MenuItem value={100}>1h 40min</MenuItem>
                                        <MenuItem value={110}>1h 50min</MenuItem>
                                        <MenuItem value={120}>2 horas</MenuItem>
                                        <MenuItem value={130}>2h 10min</MenuItem>
                                        <MenuItem value={140}>2h 20min</MenuItem>
                                        <MenuItem value={150}>2h 30min</MenuItem>
                                        <MenuItem value={160}>2h 40min</MenuItem>
                                        <MenuItem value={170}>2h 50min</MenuItem>
                                        <MenuItem value={180}>3 horas</MenuItem>
                                        <MenuItem value={190}>3h 10min</MenuItem>
                                        <MenuItem value={200}>3h 20min</MenuItem>
                                        <MenuItem value={210}>3h 30min</MenuItem>
                                        <MenuItem value={220}>3h 40min</MenuItem>
                                        <MenuItem value={230}>3h 50min</MenuItem>
                                        <MenuItem value={240}>4 horas</MenuItem>
                                        <MenuItem value={250}>4h 10min</MenuItem>
                                        <MenuItem value={260}>4h 20min</MenuItem>
                                        <MenuItem value={270}>4h 30min</MenuItem>
                                        <MenuItem value={280}>4h 40min</MenuItem>
                                        <MenuItem value={290}>4h 50min</MenuItem>
                                        <MenuItem value={300}>5 horas</MenuItem>
                                        <MenuItem value={310}>5h 10min</MenuItem>
                                        <MenuItem value={320}>5h 20min</MenuItem>
                                        <MenuItem value={330}>5h 30min</MenuItem>
                                        <MenuItem value={340}>5h 40min</MenuItem>
                                        <MenuItem value={350}>5h 50min</MenuItem>
                                        <MenuItem value={360}>6 horas</MenuItem>
                                        <MenuItem value={370}>6h 10min</MenuItem>
                                        <MenuItem value={380}>6h 20min</MenuItem>
                                        <MenuItem value={390}>6h 30min</MenuItem>
                                        <MenuItem value={400}>6h 40min</MenuItem>
                                        <MenuItem value={410}>6h 50min</MenuItem>
                                        <MenuItem value={420}>7 horas</MenuItem>
                                        <MenuItem value={430}>7h 10min</MenuItem>
                                        <MenuItem value={440}>7h 20min</MenuItem>
                                        <MenuItem value={450}>7h 30min</MenuItem>
                                        <MenuItem value={460}>7h 40min</MenuItem>
                                        <MenuItem value={470}>7h 50min</MenuItem>
                                        <MenuItem value={480}>8 horas</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>

                        </Grid>

                    </Grid>
                    {isLoading && (
                        <Grid item>
                            <LinearProgress variant="indeterminate"></LinearProgress>
                        </Grid>
                    )}

                </Box>
            </VForm>
        </LayoutBaseDePagina >
    );
}