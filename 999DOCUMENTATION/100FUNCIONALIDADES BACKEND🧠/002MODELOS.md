Mediante la creación
### Query Builder y Eloquent -- Modelos
Antes de nada, importar:
```php
use Illuminate\Support\Facades\DB;
use App\Models\Modelo;
use Illuminate\Http\Request;

//Query builder son conjunto de operaciones mySQL que podemos utilizar en nuestro código y Eloquent es un ORM (conversión de datos entre un lenguaje orientado a objetos y una BD relacional como motor de persistencia)

- ! php artisan make:model Movie --> // en la carpeta app/Models encontraremos todos los modelos, al hacer esto ya podemos utilizar para realizar todo tipo de queries sobre la tabla movies

//eloquen automáticamente enlaza el modelo con la tabla a partir del nombre de la clase, transformándolo al plural en minúsculas


```
Ejecutar el siguiente comando para crear un modelo, laravel te gestiona automáticamente la creación del modelo.
- ! php artisan make:model Movie 

- ! Por eso, al establecer los nombres de las bases de datos, tenemos que ponerlo en minúscula y en plural.