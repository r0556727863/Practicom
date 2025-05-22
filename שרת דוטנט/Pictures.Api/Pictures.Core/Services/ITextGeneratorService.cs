using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Services
{
    public interface ITextGeneratorService
    {
        Task<string> GenerateTextAsync(string topic);
    }
}
