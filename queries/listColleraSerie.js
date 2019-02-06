import gql from 'graphql-tag'

export default gql`
query listColleraSerie($genNumero: String){
  listColleraSerie(genNumero: $genNumero)
  {
    id
  	temporada
  	codigo_rodeo
  	codigo_serie
  	codigo_tipo_rodeo
  	glosa_tipo_rodeo
  	glosa_serie
  	fecha_inicio
  	codigo_club
  	glosa_club
  	codigo_asociacion
  	glosa_asociacion
  	jurado_rut
  	glosa_jurado
  	delegado_codigo
  	delegado_glosa
  	jinete1_codigo
  	jinete1_glosa
  	jinete1_club
  	jinete1_asociacion
  	jinete1_tipo_corredor
  	jinete2_codigo
  	jinete2_glosa
  	jinete2_club
  	jinete2_asociacion
  	jinete2_tipo_corredor
  	caballo1_numero
  	caballo1_nombre
  	caballo1_criadero
  	caballo2_numero
  	caballo2_nombre
  	caballo2_criadero
  	numero_animales
  	ultimo_animal
  	puntaje_total
  	puntaje_desempate
  	lugar
  	premios
  }
}
`
