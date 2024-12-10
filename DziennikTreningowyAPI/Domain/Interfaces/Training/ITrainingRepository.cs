using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Training;

public interface ITrainingRepository : IGenericRepository<Entities.Training>
{
    Task<IEnumerable<Entities.Training>> GetAllByProfileAsync(Guid profileId);
}