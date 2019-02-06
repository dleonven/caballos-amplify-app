export const updateCacheCurrentHorse = (client, item) => {
  console.log("update")
  //extract the data from the item
  const {
    genNumero,
    gen_nombre,
    fecha_nacimiento,
    nombre_criadero,
    color,

    g_1_nombre,
    g_1_1_nombre,
    g_1_2_nombre,
    g_1_1_1_nombre,
    g_1_1_2_nombre,
    g_1_2_1_nombre,
    g_1_2_2_nombre,
    g_2_nombre,
    g_2_1_nombre,
    g_2_2_nombre,
    g_2_1_1_nombre,
    g_2_1_2_nombre,
    g_2_2_1_nombre,
    g_2_2_2_nombre,

    g_1_numero,
    g_1_1_numero,
    g_1_2_numero,
    g_1_1_1_numero,
    g_1_1_2_numero,
    g_1_2_1_numero,
    g_1_2_2_numero,
    g_2_numero,
    g_2_1_numero,
    g_2_2_numero,
    g_2_1_1_numero,
    g_2_1_2_numero,
    g_2_2_1_numero,
    g_2_2_2_numero,

    g_1_fecha_nacimiento,
    g_2_fecha_nacimiento,
    g_1_1_fecha_nacimiento,
    g_1_2_fecha_nacimiento,
    g_2_1_fecha_nacimiento,
    g_2_2_fecha_nacimiento,

    g_1_nombre_criadero,
    g_2_nombre_criadero,
    g_1_1_nombre_criadero,
    g_1_2_nombre_criadero,
    g_2_1_nombre_criadero,
    g_2_2_nombre_criadero,

    g_1_color,
    g_2_color,
    g_1_1_color,
    g_1_2_color,
    g_2_1_color,
    g_2_2_color,


  } = item

  //write the data in the cache
  client.writeData({
      data: {
        currentHorse: {
          id: genNumero,
          name: gen_nombre,
          birth_date: fecha_nacimiento,
          nombre_criadero: nombre_criadero,
          color: color,

          g_1_nombree: g_1_nombre,
          g_2_nombree: g_2_nombre,
          g_1_1_nombree: g_1_1_nombre,
          g_1_2_nombree: g_1_2_nombre,
          g_2_1_nombree: g_2_1_nombre,
          g_2_2_nombree: g_2_2_nombre,

          g_1_1_1_nombree: g_1_1_1_nombre,
          g_1_1_2_nombree: g_1_1_2_nombre,
          g_1_2_1_nombree: g_1_2_1_nombre,
          g_1_2_2_nombree: g_1_2_2_nombre,
          g_2_1_1_nombree: g_2_1_1_nombre,
          g_2_1_2_nombree: g_2_1_2_nombre,
          g_2_2_1_nombree: g_2_2_1_nombre,
          g_2_2_2_nombree: g_2_2_2_nombre,

          g_1_numeroo: g_1_numero,
          g_1_1_numeroo: g_1_1_numero,
          g_1_2_numeroo: g_1_2_numero,
          g_2_numeroo: g_2_numero,
          g_2_2_numeroo: g_2_2_numero,
          g_2_1_numeroo: g_2_1_numero,
          g_1_1_1_numeroo: g_1_1_1_numero,
          g_1_1_2_numeroo: g_1_1_2_numero,
          g_1_2_1_numeroo: g_1_2_1_numero,
          g_1_2_2_numeroo: g_1_2_2_numero,
          g_2_1_1_numeroo: g_2_1_1_numero,
          g_2_1_2_numeroo: g_2_1_2_numero,
          g_2_2_1_numeroo: g_2_2_1_numero,
          g_2_2_2_numeroo: g_2_2_2_numero,

          g_1_fecha_nacimiento: g_1_fecha_nacimiento,
          g_1_1_fecha_nacimiento: g_1_1_fecha_nacimiento,
          g_1_2_fecha_nacimiento: g_1_2_fecha_nacimiento,
          g_2_fecha_nacimiento: g_2_fecha_nacimiento,
          g_2_2_fecha_nacimiento: g_2_2_fecha_nacimiento,
          g_2_1_fecha_nacimiento: g_2_1_fecha_nacimiento,

          g_1_nombre_criadero: g_1_nombre_criadero,
          g_2_nombre_criadero: g_2_nombre_criadero,
          g_1_1_nombre_criadero: g_1_1_nombre_criadero,
          g_1_2_nombre_criadero: g_1_2_nombre_criadero,
          g_2_1_nombre_criadero: g_2_1_nombre_criadero,
          g_2_2_nombre_criadero: g_2_2_nombre_criadero,

          g_1_color: g_1_color,
          g_1_1_color: g_1_1_color,
          g_1_2_color: g_1_2_color,
          g_2_color: g_2_color,
          g_2_2_color: g_2_2_color,
          g_2_1_color: g_2_1_color,

           __typename: 'currentHorse'
        }
      }
  })
}
