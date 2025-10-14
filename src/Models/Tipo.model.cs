using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Tipo
{
    [Key]
    public int ID { get; set; }
    public string Nome { get; set;  }
}