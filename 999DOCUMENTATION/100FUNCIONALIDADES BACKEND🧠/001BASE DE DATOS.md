# BASE DE DATOS
### CREACIÓN DE LA BASE DE DATOS
Para la instalación de las migraciones en la base de datos debemos modificar en el fichero de .env (si se baja al local la primera vez, tendríamos un fichero que se llama .env_example, se modificaría en ese y se cambia el nombre a .env).

```php
DB_CONNECTION=mysql //poner a mysql y no sqlite

DB_HOST=127.0.0.1
DB_PORT=3306

DB_DATABASE= nombre_de_tu_base_de_datos
DB_USERNAME= nombre_del_usuario
DB_PASSWORD= contraseña_del_usuario

//valores por defecto.
```

![[001BASE DE DATOS 2024-07-06 19.48.12.excalidraw|1200]]
### CREACIÓN DE LAS MIGRACIONES
Las migraciones se guardan en database/migrations.
Cada tabla o cambio que queremos hacer en la BD creamos una migración.

Para crear una nueva migración:
- ! php artisan make:migration create_users_table.
Para lanzar o ejecutar las últimas migraciones: (CUIDADO CON EL ORDEN DE CREACIÓN DE LAS TABLAS)
- ! php artisan migrate
Para deshacer la última migración
- ! php artisan migrate:rollback
Para deshacer todas las migraciones:
- ! php artisan migrate:reset
Para deshacer todas las migraciones y volver a lanzarlas:
- ! php artisan migrate:refresh o migrate:fresh
Para comprobar el estado actual de las migraciones.
- ! php artisan migrate:status

### CREACIÓN DE LOS ATRIBUTOS DE LAS TABLAS
**Para la creación de las tablas de la base de datos, se tiene que hacer en los archivos de migración, después de ejecutar php artisan make:migration create_tabla_table, en el método up**
```php
//Ejemplo de creación de la base de datos usuario
Schema::create('users', function (Blueprint $table) {

	$table->id(); //tipo integer autoincremental
	
	$table->string('name');
	
	$table->string('email') -> unique(); //campo único
	
	$table->string('password');
	
	$table->rememberToken() -> nullable(); //permites valores nulos
	
	$table->timestamps();

	//primera manera de crear claves ajenas
	$table->unsignedBigInteger('user_id');
	$table->foreign('user_id')->references('id')->on('users')
	//segunda manera de crear claves ajenas
	$table->foreignId('user_id') -> constrained() ->onDelete('cascade') ->onUpdate('cascade'); 

	// en down hacemos $table->dropForeign(['user_id'])
});
```
##### Ejemplo de atributos de la base de datos
![[001BASE DE DATOS-20240706195250853.webp]]
### SEEDING DE LA BASE DE DATOS
El seeding es la forma de rellenar los datos de la base de datos mediante comandos. 

Seguir los siguientes pasos:

Se localizan los ficheros en **database/seeders**

Para crear un nuevo fichero semilla:
- ! php artisan make:seeder UsersTableSeeder
Para insertar datos en la BD usamos el comando de Artisan
- ! php artisan db:seed
Para restaurar la base de datos completamente en desarrollo, incluyendo las migraciones y las semillas:
- ! php artisan migrate:refresh --seed

En el fichero seeders/DatabaseSeeder.php (4 pasos)
```php
//Importamos la base de datos --> 1 paso
use Illuminate\Support\Facades\DB;
use App\Models\User;

//Definición del array que queremos introducir --> 2 paso
private $usuarios = [
	[
	'name' => 'Ende',
	'email' => 'ende@gmail.com',
	'password' => 'ende'
	],

	[
	'name' => 'Pedro',
	'email' => 'pedro@gmail.com',
	'password' => 'pedro'
	],
];

// O ASÍ
private $usuarios = array(
	array(
	'name' => 'Ende',
	'email' => 'ende@gmail.com',
	'password' => 'ende'
	),
	array(
	'name' => 'Pedro',
	'email' => 'pedro@gmail.com',
	'password' => 'pedro'
	),
);

//Creamos la función que crea la semilla de usuarios --> 3 paso
private function seedUsers()
	{
		DB::table('users')->delete();
		foreach ($this->usuarios as $usuario) {
			$p = new User;
			$p->name =$usuario['name'];
			$p->email = $usuario['email'];
			$p->password = bcrypt($usuario['password']);
			$p->save();
	}
}

//Lo llamamos en el método run
public function run(): void
{
	//Ejecución de la función --> 4 paso
	self::seedUsers();
	$this->command->info('Tabla usuarios inicializada con datos!');
}

//Si ejecutas en visual studio code alt + z puedes leer todo el código de visual studio code en la ventana.
```

