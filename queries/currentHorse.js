import gql from 'graphql-tag'

export default gql`
query {
  currentHorse @client {
    id
    name
    birth_date
    nombre_criadero
    color

    g_1_nombree
    g_2_nombree
    g_1_1_nombree
    g_1_2_nombree
    g_2_1_nombree
    g_2_2_nombree
    g_1_1_1_nombree
    g_1_1_2_nombree
    g_1_2_1_nombree
    g_1_2_2_nombree
    g_2_1_1_nombree
    g_2_1_2_nombree
    g_2_2_1_nombree
    g_2_2_2_nombree

    g_1_numeroo
    g_2_numeroo
    g_1_1_numeroo
    g_1_2_numeroo
    g_2_1_numeroo
    g_2_2_numeroo
    g_1_1_1_numeroo
    g_1_1_2_numeroo
    g_1_2_1_numeroo
    g_1_2_2_numeroo
    g_2_1_1_numeroo
    g_2_1_2_numeroo
    g_2_2_1_numeroo
    g_2_2_2_numeroo

    g_1_fecha_nacimiento
    g_2_fecha_nacimiento
    g_1_1_fecha_nacimiento
    g_1_2_fecha_nacimiento
    g_2_1_fecha_nacimiento
    g_2_2_fecha_nacimiento

    g_1_nombre_criadero
    g_2_nombre_criadero
    g_1_1_nombre_criadero
    g_1_2_nombre_criadero
    g_2_1_nombre_criadero
    g_2_2_nombre_criadero

    g_1_color
    g_2_color
    g_1_1_color
    g_1_2_color
    g_2_1_color
    g_2_2_color
  }
}
`
