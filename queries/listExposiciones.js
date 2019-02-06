import gql from 'graphql-tag'

export default gql`
query listExposiciones($genNumero: String){
  listExposiciones(genNumero: $genNumero)
  {
    id
    exp_categoria
    exp_criador
    exp_exposicion
    exp_expositor
    exp_fecha
    exp_fecha_jura
    exp_fecha_nacimiento
    exp_jurado
    exp_lugar
    exp_madre
    exp_nombre_caballo
    exp_numero_inscripcion
    exp_padre
    exp_secretario_pista
    exp_temporada
  }
}
`
