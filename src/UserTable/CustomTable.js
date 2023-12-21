import React from 'react';
import './UserTable.css'; // Reutilizar los estilos existentes

const CustomTable = ({ data, columns }) => {
  return (
    <div className='table-responsive'>
      <table>
        <thead>
          <tr>
            
            <th>Titulo</th> 
            <th>Prioridad</th> 
            <th>Estado</th> 
            <th>Área</th>
            
          </tr>
        </thead>
        <tbody>
          
            <tr>
              
              <td >Gol</td>
              <td >Alta</td>
              <td >En Progreso</td>
              <td >Delantero</td>

            </tr>

            <tr>
              
              <td >Proyecto</td>
              <td >Alta</td>
              <td >Completado</td>
              <td >Oficina</td>

            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;