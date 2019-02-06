import gql from 'graphql-tag'

export default gql`
query listCaballos($genNumero: String $gen_nombre:String, $nombre_criadero: String){
  listCaballos(genNumero: $genNumero, gen_nombre: $gen_nombre, nombre_criadero: $nombre_criadero)
  {
    genNumero
    color
    fecha_nacimiento
    gen_nombre
    nombre_completo
    nombre_criadero
    numero_criadero

    g_1_numero
    g_2_numero
    g_1_1_numero
    g_1_2_numero
    g_2_1_numero
    g_2_2_numero
    g_1_1_1_numero
    g_1_1_2_numero
    g_1_2_1_numero
    g_1_2_2_numero
    g_2_1_1_numero
    g_2_1_2_numero
    g_2_2_1_numero
    g_2_2_2_numero

    g_1_nombre
    g_2_nombre
    g_1_1_nombre
    g_1_2_nombre
    g_2_1_nombre
    g_2_2_nombre
    g_1_1_1_nombre
    g_1_1_2_nombre
    g_1_2_1_nombre
    g_1_2_2_nombre
    g_2_1_1_nombre
    g_2_1_2_nombre
    g_2_2_1_nombre
    g_2_2_2_nombre

    g_1_fecha_nacimiento
    g_2_fecha_nacimiento
    g_1_1_fecha_nacimiento
    g_1_2_fecha_nacimiento
    g_2_1_fecha_nacimiento
    g_2_2_fecha_nacimiento

    g_1_color
    g_2_color
    g_1_1_color
    g_1_2_color
    g_2_1_color
    g_2_2_color

    g_1_numero_criadero
    g_2_numero_criadero
    g_1_1_numero_criadero
    g_1_2_numero_criadero
    g_2_1_numero_criadero
    g_2_2_numero_criadero

    g_1_nombre_criadero
    g_2_nombre_criadero
    g_1_1_nombre_criadero
    g_1_2_nombre_criadero
    g_2_1_nombre_criadero
    g_2_2_nombre_criadero

  }
}
`
