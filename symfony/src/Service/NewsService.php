<?php

declare(strict_types=1);

namespace App\Service;

use App\DTO\MediaDTO;
use App\DTO\ActualityDTO;
use App\Exception\HydrateObjectContentfulException;
use Contentful\Delivery\Resource\Entry;
use Exception;

class NewsService
{
    private $contentfulService;

    public function __construct(
        ContentfulService $contentfulService
    ) {
        $this->contentfulService = $contentfulService;
    }

    public function getActualities(): array
    {
        $actualities    = $this->contentfulService->getEntriesByContentType('actuality');
        $actualitiesDTO = [];

        if (current($actualities->getIterator()) !== null) {
            foreach ($actualities as $actuality) {
                $actualitiesDTO[] = $this->hydrateActualityDTO($actuality);
            }
        }

        return $actualitiesDTO;
    }

    public function getHotnews(int $limit): array
    {
        $hotnews    = $this->contentfulService->getEntriesByContentType('actuality', $limit);
        $hotnewsDTO = [];

        if (current($hotnews->getIterator()) !== null) {
            foreach ($hotnews as $hotnew) {
                $hotnewsDTO[] = $this->hydrateActualityDTO($hotnew);
            }
        }

        return $hotnewsDTO;
    }

    /**
     * @throws Exception
     */
    public function getActualityDTO(string $slug): ActualityDTO
    {
        $actualityDTO = $this->contentfulService->getEntriesByField('actuality', 'fields.slug', $slug, 1);

        return $this->hydrateActualityDTO($actualityDTO->getIterator()->current());
    }

    private function hydrateActualityDTO(Entry $item): ActualityDTO
    {
        $actualityDTO = new ActualityDTO();

        $actualityDTO->picture      = $this->checkMedia($item, 'picture');
        $actualityDTO->date         = $this->checkAttribute($item, 'date');
        $actualityDTO->title        = $this->checkAttribute($item, 'title');
        $actualityDTO->category     = $this->contentfulService->transformCheckboxToString($this->checkAttribute($item, 'category'));
        $actualityDTO->slug         = $this->checkAttribute($item, 'slug');
        $actualityDTO->preview      = $this->contentfulService->getRichTextContent($this->checkAttribute($item, 'preview'));
        $actualityDTO->content      = $this->contentfulService->getRichTextContent($this->checkAttribute($item, 'content'));
        if (!$item->get('ag')) {
            $actualityDTO->AG       = null;
        } else {
            $actualityDTO->AG       = $this->checkMedia($item, 'ag');
        }

        return $actualityDTO;
    }

    /**
     * @throws HydrateObjectContentfulException
     */
    private function checkAttribute(Entry $entry, string $attribute)
    {
        if (!$entry->get($attribute)) {
            throw new HydrateObjectContentfulException(
                $attribute,
                $entry->getSystemProperties()->getContentType()->getName(),
                $entry->getSystemProperties()->getId()
            );
        }

        return $entry->get($attribute);
    }

    /**
     * @throws HydrateObjectContentfulException
     */
    private function checkMedia(Entry $entry, string $attribute): MediaDTO
    {
        if (!$entry->get($attribute)) {
            throw new HydrateObjectContentfulException(
                $attribute,
                $entry->getSystemProperties()->getContentType()->getName(),
                $entry->getSystemProperties()->getId()
            );
        }

        return $this->contentfulService->getContentfulMedia($entry, $attribute);
    }
}