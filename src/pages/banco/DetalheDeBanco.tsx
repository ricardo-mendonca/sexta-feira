import { useEffect, useState } from "react";
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";

import { BancoService } from "../../shared/services/api/banco/BancoService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Box, Grid, LinearProgress, Paper, Switch, Typography } from "@mui/material";


interface IFormData {
    descricao: string;
    ativo: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    descricao: yup.string().required().min(3).max(30),
    ativo: yup.string().required()
});

export const DetalheDeBanco: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const { id = 'novo' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [descricao, setDescricao] = useState("");

    const [checked, setChecked] = useState(true);
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    useEffect(() => {
        if (id !== "novo") {
            setIsLoading(true);

            BancoService.getById(Number(id)).then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(" OPS!! algo deu errado \n" + result.message);
                    navigate("/bancos");
                } else {
                    setDescricao(result.descricao);

                    setChecked(result.ativo == '1' ? true : false);
                    formRef.current?.setData(result);
                }
            });
        } else {
            setIsLoading(false);
            formRef.current?.setData({

                descricao: '',
                ativo: '',
            })
        }
    }, [formRef, id, navigate]);

    const handleSave = (dados: IFormData) => {

        dados.ativo = (checked === true ? '1' : '0');

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);
                if (id === "novo") {
                    BancoService.create(dadosValidados).then((result) => {
                        setIsLoading(false);
                        if (result instanceof Error) {
                            alert("Ops!! algo deu ruim! \n" + result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/bancos');
                            } else {
                                navigate(`/bancos/detalhe/${result}`);
                            }
                        }
                    });
                } else {
                    setIsLoading(true);
                    BancoService.updateById(Number(id), { id: Number(id), ...dadosValidados }).then((result) => {
                        setIsLoading(false);
                        if (result instanceof Error) {
                            alert("Ops!! algo deu ruim! \n" + result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/bancos');
                            }
                        }
                    });
                }


            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            });
    };

    const handleDelete = (id: number) => {
        if (
            window.confirm(
                "Mano, tem certeza que quer apagar o registro " + id + " ?"
            )
        ) {
            BancoService.deleteById(id).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert("Registro apagado com sucesso!");
                    navigate("/bancos");
                }
            });
        }
    };

    return (

        <LayoutBaseDePagina
            titulo={id === "novo" ? "Novo Banco" : descricao}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Novo"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== "novo"}
                    mostrarBotaoApagar={id !== "novo"}

                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate("/bancos/detalhe/novo")}
                    aoClicarEmVoltar={() => navigate("/bancos")}
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

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate"></LinearProgress>
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    name="descricao"
                                    disabled={isLoading}
                                    label="Nome"
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <label>Conta Ativa ? </label>
                                <Switch
                                    checked={checked}
                                    onChange={handleChangeSwitch}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    );
};