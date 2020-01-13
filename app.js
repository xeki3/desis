$(document).ready(function() {
  console.log("hello world");

  function obtenerCandidato() {
    $.ajax({
      url: "obtener.php",
      type: "GET",
      success: function(response) {
        //console.log(response);
        let candidatos = JSON.parse(response);
        //console.log(response);

        let template = "";
        candidatos.forEach(candidato => {
          template += `   
          <option>${candidato.nombreyapellido}</option>`;
        });
        $("#candidato").html(template);
      }
    });
  }
  obtenerCandidato();

  function obtenerRegion() {
    $.ajax({
      url: "obtenerRegion.php",
      type: "GET",
      success: function(response) {
        //console.log(response);
        let regiones = JSON.parse(response);
        //console.log(response);

        let template = "";
        regiones.forEach(regione => {
          template += `   
          <option>${regione.region}</option>`;
        });
        $("#region").html(template);
      }
    });
  }
  obtenerRegion();

  $("#region").change(function() {
    if ($("#region").val()) {
      let region = $("#region").val();
      console.log(region);
      $.ajax({
        url: "obtenerComuna.php",
        type: "GET",
        data: { region },
        success: function(response) {
          //console.log(response);

          let comunas = JSON.parse(response);
          //console.log("comunas " + comunas);

          let template = "";
          comunas.forEach(comune => {
            template += `   
            <option>${comune.comuna}</option>`;
          });
          $("#comuna").html(template);
        }
      });
    }
  });

  $("#rut").keyup(function() {
    // Despejar Puntos
    var valor = $("#rut")
      .val()
      .replace(".", "");
    // Despejar Guión
    valor = valor.replace("-", "");

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + "-" + dv;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
      rut.setCustomValidity("RUT Incompleto");
      return false;
    }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      index = multiplo * valor.charAt(cuerpo.length - i);

      // Sumar al Contador General
      suma = suma + index;

      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = dv == "K" ? 10 : dv;
    dv = dv == 0 ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
      rut.setCustomValidity("RUT Inválido");
      return false;
    }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity("");
  });

  $("#nombre").keyup(function() {
    if ($("#nombre").val()) {
      let nombre = $("#nombre").val();
      nombre = _.startCase(nombre);
      $.ajax({
        url: "comprobarNombre.php",
        type: "POST",
        data: { nombre },
        success: function(response) {
          console.log(response);
          if (response == "true") {
            template = "Usuario ya existe";

            $("#yaExiste").html(template);
            $("#yaExiste").show();
          } else {
            $("#yaExiste").html("");
            $("#yaExiste").hide();
          }
        }
      });
    }
  });

  $("#aliass").keyup(function() {
    if ($("#aliass").val()) {
      let aliass = $("#aliass").val();
      $.ajax({
        url: "comprobarAlias.php",
        type: "POST",
        data: { aliass },
        success: function(response) {
          console.log(response);
          if (response == "true") {
            template = "Alias ya existe";

            $("#yaExiste2").html(template);
            $("#yaExiste2").show();
          } else {
            $("#yaExiste2").html("");
            $("#yaExiste2").hide();
          }
        }
      });
    }
  });

  //obtener

  $("#votante-form").submit(function(e) {
    console.log("submiting");

    var selected = "";
    var contador = 0;
    $("#votante-form input[type=checkbox]").each(function() {
      if (this.checked) {
        contador = contador + 1;
        selected += $(this).val() + ", ";
      }
    });

    if (selected != "" && contador >= 2) {
      //alert("Has seleccionado: " + selected + " ," + contador);
    } else {
      alert("Debes seleccionar al menos dos opciónes.");

      return false;
    }

    const postData = {
      nombre: $("#nombre").val(),
      aliass: $("#aliass").val(),
      rut: $("#rut").val(),
      email: $("#email").val(),
      region: $("#region").val(),
      comuna: $("#comuna").val(),
      candidato: $("#candidato").val(),
      nosotros: selected
    };
    console.log(postData);

    $.post("add-votante.php", postData, function(response) {
      alert(response);
      $("#votante-form").trigger("reset");
    });
    e.preventDefault();
  });
});
