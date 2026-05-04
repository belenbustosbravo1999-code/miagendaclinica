import mysql.connector

conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="miagendaclinica"
)

cursor = conexion.cursor()

def iniciar_sesion():
    print("\n--- INICIO DE SESIÓN ---")
    correo = input("Correo: ").strip()
    contrasena = input("Contraseña: ").strip()

    sql = "SELECT id_usuario, nombre, rol FROM usuarios WHERE correo=%s AND contrasena=%s"
    cursor.execute(sql, (correo, contrasena))
    usuario = cursor.fetchone()

    if usuario:
        print(f"\nBienvenido/a {usuario[1]} - Rol: {usuario[2]}")
        return usuario
    else:
        print("Correo o contraseña incorrectos.")
        return None

def ver_citas(usuario):
    print("\n--- MIS CITAS ---")

    sql = "SELECT id_cita, fecha, hora FROM citas WHERE id_usuario = %s"
    cursor.execute(sql, (usuario[0],))
    citas = cursor.fetchall()

    if citas:
        for cita in citas:
            print(f"ID: {cita[0]} | Fecha: {cita[1]} | Hora: {cita[2]}")
    else:
        print("No tienes citas registradas.")

def agendar_cita(usuario):
    print("\n--- AGENDAR CITA ---")

    fecha = input("Ingrese fecha (AAAA-MM-DD): ").strip()
    hora = input("Ingrese hora (HH:MM:SS): ").strip()

    sql = "INSERT INTO citas (fecha, hora, id_usuario) VALUES (%s, %s, %s)"
    cursor.execute(sql, (fecha, hora, usuario[0]))
    conexion.commit()

    print("Cita agendada correctamente.")

def cancelar_cita(usuario):
    print("\n--- CANCELAR CITA ---")
    ver_citas(usuario)

    id_cita = input("Ingrese el ID de la cita a cancelar: ").strip()

    sql = "DELETE FROM citas WHERE id_cita = %s AND id_usuario = %s"
    cursor.execute(sql, (id_cita, usuario[0]))
    conexion.commit()

    if cursor.rowcount > 0:
        print("Cita cancelada correctamente.")
    else:
        print("No se encontró una cita con ese ID.")

def menu():
    usuario_activo = iniciar_sesion()

    if usuario_activo is None:
        return

    while True:
        print("\n--- MENÚ MI AGENDA CLÍNICA ---")
        print("1. Ver citas")
        print("2. Agendar cita")
        print("3. Cancelar cita")
        print("4. Salir")

        opcion = input("Seleccione una opción: ").strip()

        if opcion == "1":
            ver_citas(usuario_activo)
        elif opcion == "2":
            agendar_cita(usuario_activo)
        elif opcion == "3":
            cancelar_cita(usuario_activo)
        elif opcion == "4":
            print("Saliendo del sistema...")
            break
        else:
            print("Opción no válida.")

menu()