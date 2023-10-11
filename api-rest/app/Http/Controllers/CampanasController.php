<?php

namespace App\Http\Controllers;

use App\Models\Campanas;
use Illuminate\Http\Request;;
use Illuminate\Support\Facades\Hash; // Import Hash
use Illuminate\Database\Eloquent\Builder;



class CampanasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createCampanas(Request $request)
    {
        // Validación de datos
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'ubicacion' => 'required',
            'fecha' => 'required',
            'alimentacion' => 'required',
            'capacidad' => 'required',
            'tipo' => 'required',
            'inOex' => 'required',
        ]);
    
        // Crear una nueva instancia de Campana y asignar valores
        $campanas = new Campanas();
        $campanas->nombre = $request->input('nombre');
        $campanas->descripcion = $request->input('descripcion');
        $campanas->ubicacion = $request->input('ubicacion');
        $campanas->fecha = $request->input('fecha');
        $campanas->alimentacion = $request->input('alimentacion');
        $campanas->capacidad = $request->input('capacidad');
        $campanas->tipo = $request->input('tipo');
        $campanas->inOex = $request->input('inOex');
    
        // Guardar el objeto Campana en la base de datos
        $campanas->save();
    
        // Respuesta de la API
        return response()->json([
            'status' => 1,
            'msg' => '¡Datos agregados exitosamente!',
        ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Campanas $campanas)
    {
        $campanas = Campanas::all();
        return $campanas;
    }

    public function showID($id)
    {
       
        $campanas = Campanas::find($id);

        if (!$campanas) {
            return response()->json(['message' => 'Campaña no encontrada'], 404);
        }

        return response()->json($campanas);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campanas $campanas)
    {
        //
    }

    public function updateCampanas(Request $request, $id)
    {
        
    
        $campanas = Campanas::find($id);

        if (!$campanas) {
            return response()->json([
                "status" => 0,
                "msg" => "Campaña no encontrada!"
            ], 404);
        }
        
        $campanas->nombre = $request->input('nombre', $campanas->nombre);
        $campanas->descripcion = $request->input('descripcion', $campanas->descripcion);
        $campanas->ubicacion = $request->input('ubicacion', $campanas->ubicacion);
        $campanas->fecha = $request->input('fecha', $campanas->fecha);
        $campanas->alimentacion = $request->input('alimentacion', $campanas->alimentacion);
        $campanas->capacidad = $request->input('capacidad', $campanas->capacidad);
        $campanas->tipo = $request->input('tipo', $campanas->tipo);
        $campanas->inOex = $request->input('inOex', $campanas->inOex);
        
        $campanas->save();
        
        return response()->json([
            "status" => 1,
            "msg" => "¡Actualizada Correctamente!"
        ]);
        
    }



    


    public function destroy($id)
{
    $campanas = Campanas::find($id);

    if (!$campanas) {

        return response()->json([
            "status" => 0,
            "msg" => "Campaña no encontrada."
        ], 404);
    }

    
    $campanas->delete();

    
    return response()->json([
        "status" => 1,
        "msg" => "Campaña eliminada exitosamente."
    ]);
}
}