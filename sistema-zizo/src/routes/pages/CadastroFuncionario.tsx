import { TextField, Select, MenuItem, Button, Checkbox, FormControl, InputLabel,FormControlLabel } from "@mui/material";

const CadastroFuncionario = () => {
  //fazemdo
  return (
    <div>
      <h1>Cadastro de Funcionário</h1>
      
      <form>
        <TextField fullWidth label="CPF" margin="normal" required />
        
        <TextField fullWidth label="Senha" type="password" margin="normal" required />
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Cargo</InputLabel>
          <Select label="Cargo">
            <MenuItem value="Garcom">Administrador</MenuItem>
            <MenuItem value="Cozinheiro">Cozinha</MenuItem>
            <MenuItem value="Gerente">Gerente</MenuItem>
            <MenuItem value="Gerente">Balconista</MenuItem>
          </Select>
        </FormControl>
        
        <TextField fullWidth label="Nome Completo" margin="normal" required />
        
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Ativo"
        />
        
        <TextField 
          fullWidth 
          label="Salário" 
          type="number" 
          margin="normal" 
          required 
        />
        
        <TextField fullWidth label="Telefone (opcional)" margin="normal" />
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Status</InputLabel>
          <Select label="Status">
            <MenuItem value={0}>Inativo</MenuItem>
            <MenuItem value={1}>Ativo</MenuItem>
          </Select>
        </FormControl>
        
        
        <Button type="submit" variant="contained" fullWidth>
          Cadastrar Funcionário
        </Button>
      </form>
    </div>
    //status acho que é se ta ativo ou inativo, se não for troco depois
  );
};

export default CadastroFuncionario;